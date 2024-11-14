let currentLang = 'fa'; // زبان پیش‌فرض

// بارگذاری داده‌ها از فایل JSON و نمایش آن‌ها
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const peopleList = document.getElementById('people-list');
    const siteTitle = document.getElementById('site-title'); // گرفتن عنوان سایت (برای تغییر داخل h1)

    // تابع برای تغییر زبان
    document.getElementById('lang-toggle').addEventListener('click', () => {
      currentLang = currentLang === 'fa' ? 'en' : 'fa';
      document.body.setAttribute('lang', currentLang);
      document.getElementById('lang-toggle').textContent = currentLang === 'fa' ? 'English' : 'فارسی';
      
      // تغییر عنوان سایت (document.title) و تغییر عنوان هدر (siteTitle)
      document.title = currentLang === 'fa' ? 'فراموش نخواهیم کرد' : 'We Will Not Forget';
      siteTitle.textContent = currentLang === 'fa' ? 'فراموش نخواهیم کرد' : 'We Will Not Forget';

      renderPeople(data); // رندر کردن مجدد داده‌ها بر اساس زبان
    });

    // نمایش داده‌ها
    function renderPeople(data) {
      peopleList.innerHTML = ''; // پاک کردن لیست قبلی
      data.forEach(person => {
        const card = document.createElement('div');
        card.classList.add('col-md-4');

        // استفاده از Optional Chaining (?.) برای جلوگیری از خطا در صورت نبود مقدار
        card.innerHTML = `
          <div class="card">
            <img src="${person.image_url || 'default-image.jpg'}" class="card-img-top" alt="${person.name?.[currentLang] || 'Unnamed'}">
            <div class="card-header">
              <h5 class="card-title">${person.name?.[currentLang] || 'No Name Available'}</h5>
            </div>
            <div class="card-body">
              <p><strong>${currentLang === 'fa' ? 'تاریخ فوت' : 'Death Date'}:</strong> ${person.death_date?.[currentLang] || 'No Data'}</p>
              <p><strong>${currentLang === 'fa' ? 'دلیل فوت' : 'Cause of Death'}:</strong> ${person.death_cause?.[currentLang] || 'No Data'}</p>
              <p><strong>${currentLang === 'fa' ? 'پیام آخر' : 'Last Message'}:</strong> ${person.message?.[currentLang] || 'No Message'}</p>
              <p><strong>${currentLang === 'fa' ? 'لینک ویکی‌پدیا' : 'Wikipedia Link'}:</strong> 
                <a href="${person.wiki_link?.[currentLang] || '#'}" target="_blank">${currentLang === 'fa' ? 'لینک' : 'Link'}</a>
              </p>
            </div>
            <div class="card-footer">
              <div>
                ${person.social_links?.twitter ? `<a href="${person.social_links.twitter}" target="_blank">Twitter</a>` : ''}
                ${person.social_links?.facebook ? `<a href="${person.social_links.facebook}" target="_blank">Facebook</a>` : ''}
                ${person.social_links?.instagram ? `<a href="${person.social_links.instagram}" target="_blank">Instagram</a>` : ''}
              </div>
            </div>
          </div>
        `;
        peopleList.appendChild(card);
      });
    }

    renderPeople(data); // بارگذاری داده‌ها هنگام بارگذاری اولیه صفحه
  })
  .catch(error => console.error('Error loading data:', error));