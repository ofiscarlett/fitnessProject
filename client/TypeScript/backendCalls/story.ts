import { StoryComment } from "./storyComment";
class Story {
    id_story: number;
    author: string;
    title: string;
    story: string;
    blog_date: Date;
    image_name: string;
    comments: StoryComment[]; // this is a new property
    like_count: number;
    dislike_count: number;
    reaction_type: string;    

    constructor(id: number, author: string, title: string, story: string, blog_date: Date, image_name: string, comments: StoryComment[]) {
        this.id_story = id;
        this.author = author;
        this.title = title;
        this.story = story;
        this.blog_date = blog_date;
        this.image_name = image_name;
        this.comments = comments;
       
    }
}

export { Story };