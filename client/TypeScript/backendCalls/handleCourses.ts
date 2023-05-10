import { Course } from './course.js';

class Courses {
    courses: Course[];
    #backendUrl = "";

    constructor(backendUrl: string) {
        this.courses = [];
        this.#backendUrl = backendUrl;
    }

    getCourses = async () => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl)
                .then(response => response.json())
                .then(response => {
                    this.#readJson(response);
                    resolve(this.courses);//returns an array of Course objects created in the #readJson method
                })
                .catch(error => {
                    reject(error);
                });
        });
    };

    getCourseById = async (id: number) => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl + "/" + id)
                .then(response => response.json())
                .then(response => {
                    resolve(response);//returns a single Course object
                })
                .catch(error => {
                    reject(error);
                });
        });
    };

#readJson = (json: any) => {
    json.forEach((course: any) => {
        this.courses.push(new Course(
            course.id_course,
            course.name_image1,
            course.extra_image2,
            course.extra_image3,
            course.extra_image4,
            course.video_name,
            course.course_name,
            course.trainer_name,
            course.course_description,
            course.weekdays,
            course.weekends,
            course.weekday_duration,
            course.weekend_duration,
            course.place,
            course.available_seats,
            course.price_month,
            course.price_year,
            course.trainer_image_name
        ));
    });
};
}

export { Courses };