import { Stories } from './backendCalls/handleStories.js';
import { Cookies } from './backendCalls/sendLoginData.js';
const backendUrl = "http://localhost:3001/story";
const stories = new Stories(backendUrl);
const blogContainer = document.getElementById("container");
//get all stories from the database
stories.getStories().then((stories) => {
    stories.forEach((story) => {
        renderStories(story);
    });
})
    .catch((error) => {
    alert(error);
});
const renderStories = (story) => {
    const paragraph = story.story.split("\n")[0];
    const date = new Date(story.blog_date).toDateString();
    //creating a row element to make the card responsive
    const row = document.createElement("div");
    row.className = "row";
    //creating the card element
    const blogCard = document.createElement("div");
    blogCard.className = "card";
    //creating the image element
    const imageDiv = document.createElement("div");
    imageDiv.className = "col-sm-12 col-md-4 col-lg-4";
    const image = document.createElement("img");
    image.src = `./images/blog_images/${story.image_name}`;
    image.alt = "blog image";
    image.className = "card-img-top cardImage";
    imageDiv.appendChild(image);
    blogCard.appendChild(imageDiv);
    //creating the card body element
    const cardBody = document.createElement("div");
    cardBody.className = "col-sm-12 col-md-8 col-lg-8 card-body";
    //creating the title element
    const title = document.createElement("h4");
    title.className = "card-title";
    title.innerText = story.title;
    cardBody.appendChild(title);
    //creating the author and date element
    const authorDateRow = document.createElement("div");
    authorDateRow.className = "author-date";
    const authorRow = document.createElement("div");
    authorRow.className = "author col-4";
    const authorIcon = document.createElement("img");
    authorIcon.src = "./images/svg_icons/user.svg";
    authorIcon.className = "icon1";
    authorRow.appendChild(authorIcon);
    const author = document.createElement("div");
    author.className = "blog-author";
    author.innerText = story.author;
    authorRow.appendChild(author);
    const dateRow = document.createElement("div");
    dateRow.className = "date col-8";
    const dateIcon = document.createElement("img");
    dateIcon.src = "./images/svg_icons/clock.svg";
    dateIcon.className = "icon2";
    dateRow.appendChild(dateIcon);
    const dateElement = document.createElement("div");
    dateElement.className = "blog-date";
    dateElement.innerText = date;
    dateRow.appendChild(dateElement);
    authorDateRow.append(authorRow, dateRow);
    cardBody.appendChild(authorDateRow);
    //creating a line break
    const lineBreak = document.createElement("hr");
    cardBody.appendChild(lineBreak);
    //creating the paragraph element
    const paragraphElement = document.createElement("p");
    paragraphElement.className = "content-paragraph paragraph";
    paragraphElement.innerText = paragraph;
    cardBody.appendChild(paragraphElement);
    //creating the read more link
    const readMore = document.createElement("a");
    readMore.className = "btn read-more-link";
    //readMore.href = "blogArticle.html?id=" + story.id_story;
    readMore.innerText = "Read More >>";
    cardBody.appendChild(readMore);
    blogCard.appendChild(cardBody);
    blogContainer.appendChild(blogCard);
    readMore.addEventListener('click', () => {
        const cookie = new Cookies();
        const isLoggedIn = cookie.isCookieSet("session_token");
        if (isLoggedIn) {
            window.location.href = `blogArticle.html?id=${story.id_story}`;
        }
        else {
            alert("You need to be logged in to read the full article");
        }
    });
};
