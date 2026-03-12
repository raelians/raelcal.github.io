<style>.post-header{display:none;}#new-era-calendar-root{all:initial;display:block;font-family:'Pretendard',sans-serif;max-width:500px;margin:20px auto;background:#f1f2f6;padding:12px;border-radius:24px}#new-era-calendar-root .calendar{background:#fff;border-radius:20px;box-shadow:0 12px 30px rgb(0 0 0 / .12);overflow:hidden;margin-bottom:15px}#new-era-calendar-root .nav{background:#2f3542;color:#fff;padding:15px 25px;display:flex;flex-direction:column;align-items:center;gap:8px}#new-era-calendar-root .nav-top{display:flex;width:100%;justify-content:space-between;align-items:center}#new-era-calendar-root .nav h2{margin:0;font-size:1.5rem;font-weight:700;color:#fff}#new-era-calendar-root .ah-display{font-size:.95rem;color:#ff4757;font-weight:700;background:rgb(255 255 255 / .1);padding:4px 12px;border-radius:20px}#new-era-calendar-root .nav button{background:rgb(255 255 255 / .15);border:1px solid rgb(255 255 255 / .4);color:#fff;padding:6px 14px;cursor:pointer;border-radius:10px;font-size:.85rem}#new-era-calendar-root .grid{display:grid;grid-template-columns:repeat(7,1fr);padding:15px}#new-era-calendar-root .day-label{text-align:center;font-weight:700;color:#a4b0be;font-size:.85rem;padding-bottom:10px}#new-era-calendar-root .cell{height:85px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;border-radius:12px}#new-era-calendar-root .solar-num{font-size:1.3rem;font-weight:700;color:#2f3542}#new-era-calendar-root .new-era-num{font-size:.85rem;color:#57606f;margin-top:5px}#new-era-calendar-root .has-event::after{content:'';position:absolute;bottom:8px;width:6px;height:6px;background:#ff4757;border-radius:50%}#new-era-calendar-root .grid div:nth-child(7n+1) .solar-num{color:#ff4757}#new-era-calendar-root .grid div:nth-child(7n) .solar-num{color:#1e90ff}#new-era-calendar-root .is-new-year{background:#fff0f0!important}#new-era-calendar-root .dim{opacity:.2}#new-era-calendar-root .today{border:2px solid #2f3542}#new-era-calendar-root .event-list{background:#fff;border-radius:15px;padding:15px 20px;box-shadow:0 4px 15px rgb(0 0 0 / .05)}#new-era-calendar-root .event-list h3{margin:0 0 10px 0;font-size:1rem;color:#2f3542;border-left:4px solid #ff4757;padding-left:10px}#new-era-calendar-root .event-item{font-size:.9rem;color:#57606f;padding:6px 0;border-bottom:1px dashed #eee;display:flex;justify-content:space-between;align-items:center}#new-era-calendar-root .event-item:last-child{border-bottom:none}#new-era-calendar-root .event-date{font-weight:700;color:#2f3542;min-width:90px;font-size:.85rem}#new-era-calendar-root .period-tag{font-size:.75rem;color:#ff4757;border:1px solid #ff4757;padding:1px 5px;border-radius:4px;font-weight:700}</style>
<div style="border-radius: 16px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 15px; height: 160px; margin-bottom: 10px; overflow: hidden; position: relative; width: 100%;"><img id="planner-img" class="PlannerHeader" alt="Planner Header" src="https://images.unsplash.com/photo-1529419412599-7bb870e11810?auto=format&fit=crop&q=80&w=1000" style="filter: brightness(.8); height: 100%; object-fit: cover; width: 100%;" /><div style="bottom: 15px; color: white; left: 20px; position: absolute; text-shadow: rgba(0, 0, 0, 0.5) 0px 2px 4px;"><h1 style="font-size: 1.5rem; font-weight: 800; margin: 0px;">라엘리안 aH <span id="now-year"></span>.<span id="now-month"></span>-<span id="now-day"></span> 달력</h1><p style="font-size: 0.85rem; margin: 0px; opacity: 0.9;">8월 6일이 신년이며 라엘리안에게 새해가 됩니다.</p></div></div>
<script>(function() {const imgElement = document.getElementById('planner-img');const month = new Date().getMonth() + 1;let imageUrl = "";if (month >= 3 && month <= 5) {imageUrl = "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1000";} else if (month >= 6 && month <= 8) {imageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000";} else if (month >= 9 && month <= 11) {imageUrl = "https://images.unsplash.com/photo-1507187632231-5beb21a654a2?auto=format&fit=crop&q=80&w=1000";} else {imageUrl = "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&q=80&w=1000";}if (imageUrl) {imgElement.src = imageUrl;}})();</script>
<div id="new-era-calendar-root">
    <div class="calendar">
        <div class="nav">
            <div class="nav-top">
                <button id="nec-prevMonth">이전</button>
                <h2 id="nec-monthDisplay"></h2>
                <button id="nec-nextMonth">다음</button>
            </div>
            <div id="nec-ahDisplay" class="ah-display"></div>
        </div>
        <div class="grid" id="nec-grid">
            <div class="day-label">일</div><div class="day-label">월</div><div class="day-label">화</div>
            <div class="day-label">수</div><div class="day-label">목</div><div class="day-label">금</div><div class="day-label">토</div>
        </div>
    </div>

    <div class="event-list" id="nec-eventList">
        <h3 id="nec-eventTitle">이달의 기념일</h3>
        <div id="nec-eventItems"></div>
    </div>
	<p><br/></p><p><br/></p><p><br/></p><p><br/></p>
    <script type='text/javascript'>(function() {
        let viewDate = new Date();

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

            const todayEra = getCorrectNewEra(new Date());
            const nowYearSpan = document.getElementById('now-year');
            if (nowYearSpan) {
                nowYearSpan.innerText = todayEra.ahYear;
            }
            const staticEvents = [
                { m: 11, d: 25, n: "수태기념일" }, { m: 2, d: 8, n: "국제 여성의 날" },
                { m: 2, d: 20, n: "국제 행복의 날" }, { m: 4, d: 1, n: "낙원주의 날" },
                { m: 8, d: 4, n: "국제 성교육의 날" }, { m: 10, d: 20, n: "국제 아동권리의 날" },
                { m: 11, d: 10, n: "인권의 날" }, { m: 9, d: 13, n: "노브라 데이" },
                { m: 1, d: 6, n: "여성 할례 무관용의 날" }, { m: 7, d: 6, n: "신년 (New Era)" },
                { m: 9, d: 7, n: "두 번째 만남" }, { m: 11, d: 13, n: "첫 번째 만남 기념일" }
            ];
            const dynamicEvents = [
                { m: 3, d: getFirstSundayOfApril(y), n: "인류 창조기념일" },
                { m: 5, d: getLastSundayOfJune(y), n: "스와스티카 부흥의 날" },
                { m: 7, d: getFourthSaturdayOfAugust(y), n: "고토플리스데이" }
            ];
            const allEvents = staticEvents.concat(dynamicEvents);
            
            let currentMonthEvents = allEvents.filter(e => e.m === m).map(e => ({...e, type: 'day'}));
            
            // [수정] 클리토리스 이해의 달: 오직 양력 5월(m === 4)에만 표시
            if (m === 4) { 
                currentMonthEvents.push({ m: 4, d: '1~31일', n: "클리토리스 이해의 달", type: 'period' });
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
			// render 함수 내부에 추가하거나, 스크립트 하단에 별도로 배치하세요.
            function updateHeaderEra() {
              const todayEra = getCorrectNewEra(new Date()); // 현재 날짜의 aH 정보 계산
              const yearEl = document.getElementById('now-year');
              const monthEl = document.getElementById('now-month');
              const dayEl = document.getElementById('now-day');
              if (yearEl) yearEl.innerText = todayEra.ahYear;
              if (monthEl) monthEl.innerText = String(todayEra.month).padStart(2, '0'); // '03' 형태로 표시
              if (dayEl) dayEl.innerText = String(todayEra.day).padStart(2, '0');
            }
            // 최초 1회 실행
            updateHeaderEra();
        }
        document.getElementById('nec-prevMonth').onclick = function() { viewDate.setMonth(viewDate.getMonth() - 1); render(); };
        document.getElementById('nec-nextMonth').onclick = function() { viewDate.setMonth(viewDate.getMonth() + 1); render(); };
        render();
    })();</script>
</div>
