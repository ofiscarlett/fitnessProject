import pool from '../db.js'

const story = {
    getAllStories: async () => {
        const result = await pool.query('SELECT * FROM stories');
        return result;
    },
    getStoryById: async (id: number, id_user: number) => {
        const result = await pool.query('SELECT * FROM stories WHERE id_story = $1', [id]);

        // If the story exists, get the comments for that story        
        if(result.rowCount > 0) {
            const commentResult = await pool.query('SELECT comments.*,users.username FROM comments INNER JOIN users ON comments.id_user=users.id_user WHERE id_story = $1', [id]);
            //Sets comments for the story and sets if user can delete the comment
            result.rows[0].comments = commentResult.rows;
            result.rows[0].comments.forEach((comment: any) => {
                if(comment.id_user === id_user) {
                    comment.canDelete = true;
                } else {
                    comment.canDelete = false;
                }   
            });

            // If the story has reactions, get the reaction count for the story
            const likeCount = await pool.query('SELECT COUNT(id_reaction) as like_count FROM story_reactions WHERE id_story = $1 AND reaction_type = $2', [id, 'like']);
            const disLikeCount = await pool.query('SELECT COUNT(id_reaction) as dislike_count FROM story_reactions WHERE id_story = $1 AND reaction_type = $2', [id, 'dislike']);
            const userReaction = await pool.query('SELECT reaction_type FROM story_reactions WHERE id_story = $1 AND id_user = $2', [id, id_user]);

            result.rows[0].like_count = parseInt(likeCount.rows[0].like_count);
            result.rows[0].dislike_count = parseInt(disLikeCount.rows[0].dislike_count);            
            result.rows[0].reaction_type = userReaction.rows[0]?.reaction_type || null;
        }
        // count the number of comments for a story
        const countStoryComments = await pool.query('SELECT COUNT(id_response) as comment_count FROM comments WHERE id_story = $1', [id]);
        result.rows[0].comment_count = countStoryComments.rows[0].comment_count;
        
        return result;
    },
    addNewStory: async (body: any) => {      
        const result = await pool.query('insert into stories (author, title, story, blog_date, image_name) VALUES ($1, $2, $3, $4) RETURNING *', [body.author, body.title, body.story, body.blog_date, body.image_name]);       
        return result;
    },
    // post a comment to a story
    addStoryComment: async (body: any, id_user: number) => {
        const result = await pool.query('insert into comments (id_story, id_user, content, date_added) VALUES ($1, $2, $3, $4) RETURNING *', [body.id_story, id_user, body.content, body.date_added]);       
        return result;
    },
    // post a reaction to a story
    addStoryReaction: async (body: any, id_user: number) => {
        const result = await pool.query('insert into story_reactions (id_story, id_user, reaction_type) VALUES ($1, $2, $3) RETURNING *', [body.id_story, id_user, body.reactionType]);       
        return result;
    },
    // delete reaction from a story
    deleteStoryReaction: async (id_user: number, id_story: number, reaction_type: string) => {
        const result = await pool.query('DELETE FROM story_reactions WHERE id_user = $1 AND id_story = $2 AND reaction_type = $3', [id_user, id_story, reaction_type]);
        return result;
    },
    // delete a comment from a story
    deleteStoryComment: async (id: number, id_user: number) => {
        const result = await pool.query('DELETE FROM comments WHERE id_response = $1 and id_user = $2', [id, id_user]);
        return result;
    },
}

export default story;