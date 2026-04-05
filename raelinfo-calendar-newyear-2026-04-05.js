(function() {
        let viewDate = new Date();

        // [수동 설정 구역] 여기서 [월, 일]을 마음대로 수정하세요! (1월은 1, 12월은 12)
        function getManualEvents(y) {
            const data = {
                // 연도: { embassy: [ [월, 일], [월, 일] ... ] }
                2025: { embassy: [[4, 5]] }, 
                2026: { embassy: [[7, 11]] },
                // 예: 2027년은 4월 10일과 11일이라면 아래처럼 작성
                2027: { embassy: [[4, 10], [4, 11]] } 
            };
            return data[y] || { embassy: [] };
        }

        function getFirstSundayOfApril(y) { let d = new Date(y, 3, 1); while(d.getDay()!==0) d.setDate(d.getDate()+1); return d.getDate(); }
        function getLastSundayOfJune(y) { let d = new Date(y, 6, 0); while(d.getDay()!==0) d.setDate(d.getDate()-1); return d.getDate(); }
        function getFourthSaturdayOfAugust(y) { 
            let d = new Date(y, 7, 1); let count = 0; 
            while(count < 4) { if(d.getDay() === 6) count++; if(count < 4) d.setDate(d.getDate()+1); }
            return d.getDate();
        }

        function getCorrectNewEra(date) {
            const y = date.getFullYear(); let refDate = new Date(y, 7, 6);
            if (date < refDate) refDate = new Date(y - 1, 7, 6);
            const diffInMs = date.getTime() - refDate.getTime();
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
            const daysInMonths = [31, 30, 31, 30, 31, 31, 28, 31, 30, 31, 30, 31];
            const checkYear = refDate.getFullYear() + (refDate.getMonth() >= 7 ? 1 : 0);
            const isLeap = (checkYear % 4 === 0 && checkYear % 100 !== 0) || (checkYear % 400 === 0);
            if (isLeap) daysInMonths[6] = 29;
            let remainingDays = diffInDays; let m = 0;
            while (m < 12 && remainingDays >= daysInMonths[m]) { remainingDays -= daysInMonths[m]; m++; }
            return { month: m + 1, day: remainingDays + 1, isNewYear: diffInDays === 0, ahYear: refDate.getFullYear() - 1945 };
        }

        function render() {
            const grid = document.getElementById('nec-grid');
            const display = document.getElementById('nec-monthDisplay');
            const ahDisplay = document.getElementById('nec-ahDisplay');
            const eventListSection = document.getElementById('nec-eventList');
            const eventItems = document.getElementById('nec-eventItems');
            const y = viewDate.getFullYear(); const m = viewDate.getMonth();
            
            display.innerText = y + "." + String(m + 1).padStart(2, '0');
            ahDisplay.innerText = "AH " + getCorrectNewEra(new Date(y, m, 1)).ahYear + "년";

            const manual = getManualEvents(y);

            const staticEvents = [
                { m: 11, d: 25, n: "수태기념일" }, { m: 2, d: 8, n: "국제 여성의 날" },
                { m: 2, d: 20, n: "국제 행복의 날" }, { m: 4, d: 1, n: "낙원주의 날" },
                { m: 8, d: 4, n: "국제 성교육의 날" }, { m: 10, d: 20, n: "국제 아동권리의 날" },
                { m: 11, d: 10, n: "인권의 날" }, { m: 9, d: 13, n: "노브라 데이" },
                { m: 1, d: 6, n: "여성 할례 무관용의 날" }, { m: 7, d: 6, n: "신년 (New Era)" },
                { m: 9, d: 7, n: "두 번째 만남" }, { m: 11, d: 13, n: "첫 번째 만남 기념일" }
            ];
            
            let dynamicEvents = [
                { m: 3, d: getFirstSundayOfApril(y), n: "인류 창조기념일" },
                { m: 5, d: getLastSundayOfJune(y), n: "스와스티카 부흥의 날" },
                { m: 7, d: getFourthSaturdayOfAugust(y), n: "고토플리스데이" }
            ];

            // [핵심] 수동 입력된 [월, 일] 데이터를 기념일에 추가
            manual.embassy.forEach(item => {
                // item[0]은 월(1~12), item[1]은 일
                dynamicEvents.push({ m: item[0] - 1, d: item[1], n: "우주인 대사관의 날" });
            });

            const allEvents = staticEvents.concat(dynamicEvents);
            let currentMonthEvents = allEvents.filter(e => e.m === m).map(e => ({...e, type: 'day'}));
            
            if (m === 4) { 
                currentMonthEvents.push({ m : 4, d: '1~31일', n: "클리토리스 이해의 달", type: 'period' });
            }

            if (currentMonthEvents.length > 0) {
                eventListSection.style.display = 'block';
                eventItems.innerHTML = currentMonthEvents.map(ev => 
                    `<div class="event-item">
                        <span class="event-date">${ev.type==='day'?(ev.m + 1)+'월 '+ev.d+'일':ev.d}</span> 
                        <span>${ev.n} ${ev.type==='period'?'<span class="period-tag">캠페인</span>':''}</span>
                    </div>`
                ).join('');
            } else { eventListSection.style.display = 'none'; }

            document.querySelectorAll('.cell').forEach(el => el.remove());
            const firstDay = new Date(y, m, 1).getDay();
            const startDate = new Date(y, m, 1 - firstDay);
            for (let i = 0; i < 42; i++) {
                const curr = new Date(startDate); curr.setDate(startDate.getDate() + i);
                const cell = document.createElement('div'); cell.className = 'cell';
                if (curr.getMonth() !== m) cell.classList.add('dim');
                if (curr.toDateString() === new Date().toDateString()) cell.classList.add('today');
                if (allEvents.some(e => e.m === curr.getMonth() && e.d === curr.getDate())) cell.classList.add('has-event');
                const newEra = getCorrectNewEra(curr);
                if (newEra.isNewYear) cell.classList.add('is-new-year');
                cell.innerHTML = `<span class="solar-num">${curr.getDate()}</span><span class="new-era-num">${newEra.month}.${newEra.day}</span>`;
                grid.appendChild(cell);
            }

            function updateHeaderEra() {
              const todayEra = getCorrectNewEra(new Date());
              const yearEl = document.getElementById('now-year');
              const monthEl = document.getElementById('now-month');
              const dayEl = document.getElementById('now-day');
              if (yearEl) yearEl.innerText = todayEra.ahYear;
              if (monthEl) monthEl.innerText = String(todayEra.month).padStart(2, '0');
              if (dayEl) dayEl.innerText = String(todayEra.day).padStart(2, '0');
            }
            updateHeaderEra();
        }

        // 이미지 로직
        const imgElement = document.getElementById('planner-img');
        const month = new Date().getMonth() + 1;
        let imageUrl = "";
        if (month >= 3 && month <= 5) imageUrl = "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1000";
        else if (month >= 6 && month <= 8) imageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000";
        else if (month >= 9 && month <= 11) imageUrl = "https://images.unsplash.com/photo-1507187632231-5beb21a654a2?auto=format&fit=crop&q=80&w=1000";
        else imageUrl = "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&q=80&w=1000";
        if (imgElement) imgElement.src = imageUrl;

        document.getElementById('nec-prevMonth').onclick = function() { viewDate.setMonth(viewDate.getMonth() - 1); render(); };
        document.getElementById('nec-nextMonth').onclick = function() { viewDate.setMonth(viewDate.getMonth() + 1); render(); };
        render();
    })();