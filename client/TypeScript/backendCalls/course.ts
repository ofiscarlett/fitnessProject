class Course {
    id_course: number;
    name_image1: string;
    extra_image2: string;
    extra_image3: string;
    extra_image4: string;
    video_name: string;
    course_name: string;
    trainer_name: string;
    course_description: string;
    weekdays: string;
    weekends: string;
    weekday_duration: string;
    weekend_duration: string;
    place: string;
    available_seats: number;
    price_month: number;   
    price_year: number;
    trainer_image_name: string;

    constructor (id_course: number, name_image1: string, extra_image2: string, extra_image3: string, extra_image4: string, video_name: string, course_name: string, trainer_name: string, course_description: string, weekdays: string, weekends: string, weekday_duration: string, weekend_duration: string, place: string, available_seats: number, price_month: number, price_year: number, trainer_image_name: string) {
        this.id_course = id_course;
        this.name_image1 = name_image1;
        this.extra_image2 = extra_image2;
        this.extra_image3 = extra_image3;
        this.extra_image4 = extra_image4;
        this.video_name = video_name;
        this.course_name = course_name;
        this.trainer_name = trainer_name;
        this.course_description = course_description;
        this.weekdays = weekdays;
        this.weekends = weekends;
        this.weekday_duration = weekday_duration;
        this.weekend_duration = weekend_duration;
        this.place = place;
        this.available_seats = available_seats;
        this.price_month = price_month;
        this.price_year = price_year;
        this.trainer_image_name = trainer_image_name;
    }
}

export { Course };