let imagesItems = [...document.querySelectorAll(".img-wrap")];
console.log(imagesItems);
let titles = [...document.querySelectorAll("h2")];
let titleMessage = document.querySelector(".title");


//具体的にいつ発動させるのかを決めるオプション
let options = {
    rootMargin: "0px", //デフォルトで０.marginとほぼ同じ。
    threshold: 0.5, //閾値は0.2。これが１になると完全に画面におさまってから発動する
};

// 監視対象になった瞬間activeを負荷する関数。ある特定の位置を超えると作動する関数
let setItemActive = (entries) => {
    console.log(entries);
    entries.map((entry) => {
        //mapは返り値を持つ（新しく配列を生成する）、forEachは返り値を持たない。
        // console.log(entry.isIntersecting);
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        } else {
            entry.target.classList.remove("active");
        }
    });
};

// どこにいるのか監視する。そして特定の位置に来たら関数を呼ぶ。
let observer = new IntersectionObserver(setItemActive, options);


//img-wrapは偶数と奇数で出現する場所が違うようになる処理をする
imagesItems.map((item, index) => {
    console.log(item, index);
    item.children[0].style.backgroundImage = `url(./img/${index + 1}.jpg)`;
    index % 2 == 0 ? (item.style.left = "55%") : (item.style.left = "5%");
    observer.observe(item);
});


//titleの文字を持ってくる
titles.map((title, index) => {
    index % 2 == 0 ? (title.style.left = "45%") : (title.style.left = "35%");
    observer.observe(title);
});

observer.observe(titleMessage);
