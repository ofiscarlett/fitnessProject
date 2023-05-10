class StoryComment {
    constructor(id, id_story, id_user, content, date_added, username, canDelete) {
        this.id_response = id;
        this.id_story = id_story;
        this.id_user = id_user;
        this.content = content;
        this.date_added = date_added;
        this.username = username;
        this.canDelete = canDelete;
    }
}
export { StoryComment };
