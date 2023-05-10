import { Story } from './backendCalls/story.js';
import { Stories } from './backendCalls/handleStories.js';
import { StoryComment } from './backendCalls/storyComment.js';

const backendUrl = "http://localhost:3001/story";

const stories = new Stories(backendUrl);

const blogTitle = document.getElementById("storyTitle") as HTMLHeadingElement;
const blogImage = document.getElementById("storyImage") as HTMLImageElement;
const blogDate = document.getElementById("storyDate") as HTMLParagraphElement;
const blogAuthor = document.getElementById("storyAuthor") as HTMLParagraphElement;
const blogFullText = document.getElementById("storyFullText") as HTMLParagraphElement;
const blogComments = document.getElementById("commentlist") as HTMLUListElement;
const commentInput = document.getElementById("newcomment") as HTMLInputElement;
const commentCount = document.getElementById("comment_count") as HTMLHeadElement;

// Like/dislike buttons
const likeButton = document.getElementById("green") as HTMLButtonElement;
const dislikeButton = document.getElementById("red") as HTMLButtonElement;
const likeCountSpan = document.getElementById("num-likes") as HTMLSpanElement;
const dislikeCountSpan = document.getElementById("num-dislikes") as HTMLSpanElement;

let likeCount: number = 0;
let dislikeCount: number = 0;
let likeClicked: boolean = false;
let dislikeClicked: boolean = false;

// This is used to get the story id from the url:
const queryParams = new URLSearchParams(window.location.search);
const id_story = Number(queryParams.get('id'));

//get the story with given id from the database
stories.getStoryById(id_story).then((story: Story) => {    
    renderStory(story);
})
.catch((error: any) => {
    alert(error);
});

const renderStory = (story: Story) => {
    blogTitle.innerText = story.title;
    blogImage.src = `./images/blog_images/${story.image_name}`;
    blogFullText.innerText = story.story;
    blogDate.innerText = new Date(story.blog_date).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'} );
    blogAuthor.innerText = `By: ${story.author}`;
    updateReactions(story);
    renderComments(story.comments);
}

const blogCommentList: StoryComment[] = [];

const renderComments = (comments: StoryComment[]) => {
    blogCommentList.push(...comments);
    commentCount.innerText = `Comments (${blogCommentList.length})`; // update the comment count

    comments.forEach((comment: StoryComment) => {
        const li = document.createElement("li");
        li.setAttribute('class', 'list-group-item');
        li.innerHTML = `
            <div class="comment">
                <div class="comment-author">
                    <h3>${comment.username}</h3>
                    <div class="meta">${new Date(comment.date_added).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                </div>
                <div class="comment-content">
                    <p>${comment.content}</p>
                </div>
                <button class="delete-comment-btn">
                    <i class="bi bi-trash"></i>
                </button>
            </div>`;
        blogComments.insertBefore(li, blogComments.firstChild);

        const deleteBtn = li.querySelector('.delete-comment-btn') as HTMLButtonElement;
        // hide delete button if the comment is not made by the logged in user
        if (comment.canDelete !== true) {
            deleteBtn.style.display = 'none';
        }
        deleteBtn.addEventListener('click', () => {
            // delete the comment from the database
            stories.deleteComment(comment.id_response).then((result: any) => {
                // remove the comment from the comments array
                const commentIndex = blogCommentList.indexOf(comment);
                blogCommentList.splice(commentIndex, 1);

                // remove the li element from the DOM
                li.remove();

                // update the comment count
                commentCount.innerText = `Comments (${blogCommentList.length})`;
            }).catch((error: any) => {
                alert(error);
            });
        });
    });
}
// add a new comment
commentInput.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const comment = new StoryComment(0, id_story, 0, commentInput.value, new Date(), '', true);
        stories.addComment(comment).then((result: any) => {
            if (result) {
                renderComments(result);
                commentInput.value = "";
            }
        })
        .catch((error: any) => {
            alert(error);
        });
    }
});

const updateReactions = (story: Story) => {
    dislikeClicked = story.reaction_type === "dislike";
    likeClicked = story.reaction_type === "like";
    if (dislikeClicked) {
        dislikeButton.style.backgroundColor = "#FF0266";
    }
    if (likeClicked) {
        likeButton.style.backgroundColor = "#03DAC6";
    }
    likeCount = story.like_count;
    dislikeCount = story.dislike_count;
    likeCountSpan.textContent = likeCount.toString();
    dislikeCountSpan.textContent = dislikeCount.toString();
}

likeButton.addEventListener("click", () => {
  if (!likeClicked) {    
    stories.addReaction(id_story, "like").then((result: any) => {      
        likeCount++;
        likeCountSpan.textContent = likeCount.toString();
        likeButton.style.backgroundColor = "#03DAC6";
        likeClicked = true;
        if (dislikeClicked) {
            stories.deleteReaction(id_story, "dislike").then((result: any) => {
                dislikeCount--;
                dislikeCountSpan.textContent = dislikeCount.toString();
                dislikeButton.style.backgroundColor = "transparent";
                dislikeClicked = false;
            });
        }
    });
  } else {    
    stories.deleteReaction(id_story, "like").then((result: any) => {
    likeCount--;
    likeCountSpan.textContent = likeCount.toString();
    likeButton.style.backgroundColor = "transparent";
    likeClicked = false;
    });
  }
});

dislikeButton.addEventListener("click", () => {
    if (!dislikeClicked) {        
        stories.addReaction(id_story, "dislike").then((result: any) => {    
            dislikeCount++;
            dislikeCountSpan.textContent = dislikeCount.toString();
            dislikeButton.style.backgroundColor = "#FF0266";
            dislikeClicked = true;
            if (likeClicked) {
                stories.deleteReaction(id_story, "like").then((result: any) => {
                    likeCount--;
                    likeCountSpan.textContent = likeCount.toString();
                    likeButton.style.backgroundColor = "transparent";
                    likeClicked = false;
                });
            }
        });
      } else {
        stories.addReaction(id_story, "dislike").then((result: any) => {    
            dislikeCount--;
            dislikeCountSpan.textContent = dislikeCount.toString();
            dislikeButton.style.backgroundColor = "transparent";
            dislikeClicked = false;
        });
      }
});