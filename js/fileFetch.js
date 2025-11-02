window.onload = function () {




    fetch('posts.json')
        .then((response) => response.json())
        .then(json => {
            var grid = document.querySelector('.posts-grid');
            for (const singlePostInJSONObject of json) {
                const article = document.createElement('article');
                article.classList.add('post-card');
                const postHeader = document.createElement('div');
                postHeader.classList.add('post-header');
                const postDate = document.createElement('span');
                postDate.classList.add('post-date');
                postDate.textContent = singlePostInJSONObject.date;
                postHeader.appendChild(postDate);
                article.appendChild(postHeader);
                const postTitle = document.createElement('h2');
                postTitle.classList.add('post-title');
                postTitle.style.textTransform = 'capitalize';
                postTitle.style.fontWeight = 'bold';
                postTitle.textContent = singlePostInJSONObject.title;
                const postBody = document.createElement('p');
                postBody.textContent = singlePostInJSONObject.content;
                
                const postImg = document.createElement('img');
                postImg.classList.add('post-image');
                postImg.src = singlePostInJSONObject.image;
                
                article.appendChild(postImg);
                article.appendChild(postTitle);
                article.appendChild(postBody);
                grid.appendChild(article);
                
            }
        }).catch(err => {
            let errDiv = document.createElement("div");
            errDiv.className = 'post';
            errDiv.innerText = err;
            document.body.appendChild(errDiv);
        }).finally(() => {
            let footer = document.querySelector(".footer");
            if (footer) {
                date = new Date().toLocaleString()
                footer.querySelector('p').innerText = date;
            }
        })

}
