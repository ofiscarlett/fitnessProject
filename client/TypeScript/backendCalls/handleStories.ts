import { Cookies } from './sendLoginData.js';
import { Story } from './story.js';

class Stories {
    stories: Story[];
    #backendUrl = "";

    constructor(backendUrl: string) {
        this.stories = [];
        this.#backendUrl = backendUrl;
    }

    getStories = async () => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl)
                .then(response => response.json())
                .then(response => {
                    this.#readJson(response);
                    resolve(this.stories);//returns an array of Story objects
                })
                .catch(error => {
                    reject(error);  
                });
        });
    };

    getStoryById = async (id: number) => {
        // get token from cookie
        const token = new Cookies().getCookie('session_token');
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl + "/" + id, {                
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` 
                    },
                })
                .then(response => {
                    if (response.status === 200){
                        return response.json();
                    } else {
                        throw new Error(`${response.statusText}.Please register or login`);
                    }
                })
                .then(response => {
                    resolve(response);//returns a single Story object
                })
                .catch(error => {
                    reject(error);
                });  
        });

    };
    
    addComment = async (comment: any) => {
        // get token from cookie
        const token = new Cookies().getCookie('session_token');
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl + "/newcomment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify(comment)
            })
                .then(response => response.json())
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };

    //delete comment
    deleteComment = async (id: number) => {
        // get token from cookie
        const token = new Cookies().getCookie('session_token');
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl + "/deletecomment/" + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',                    
                    Authorization: `Bearer ${token}` 
                }
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };

    addReaction = async (id_story: number, reactionType: string) => {
        // get token from cookie
        const token = new Cookies().getCookie('session_token');
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl + "/newreaction", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({
                    id_story: id_story,
                    reactionType: reactionType,
                })
            })
                .then(response => response.json())
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };

    //delete reaction
    deleteReaction = async (id_story: number, reactionType: string) => {
        // get token from cookie
        const token = new Cookies().getCookie('session_token');
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl + "/deletereaction/" + id_story + '/' + reactionType, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',                    
                    Authorization: `Bearer ${token}` 
                }
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };


    #readJson = (allStories: any) => {
        allStories.forEach((story: any) => {
            this.stories.push(new Story(story.id_story, story.author, story.title, story.story, story.blog_date, story.image_name, story.comments));
        });
    };
    
    // This can be used, if we decide to add the ability to add stories to the website:

    // #addToStoryArray(author: string, title: string, stoory: string, blog_date: Date, image_name: string) {
    //     const story = new Story(author, title, stoory, blog_date, image_name);
    //     this.stories.push(story);
    //     return story;
    // }

}

export { Stories };

   