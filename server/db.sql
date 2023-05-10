drop database if exists FitnessWebSite;
create database FitnessWebSite;
use FitnessWebSite;

create table users (
    id_user serial primary key,
    firstname varchar(50),
    lastname varchar(50),
    email varchar(50),
    username varchar(50),
    passwd varchar(255),
    street_address varchar(50),
    postal_code char(5),
    city varchar(50),
    phone_number varchar(50)
);

create table courses (
    id_course serial primary key,
    name_image1 varchar(100),
    extra_image2 varchar(100),
    extra_image3 varchar(100),
    extra_image4 varchar(100),
    video_name varchar(100),
    course_name varchar(50),
    trainer_name varchar(50),
    course_description varchar(5000),
    weekdays varchar(50),
    weekends varchar(50),
    weekday_duration varchar(50),
    weekend_duration varchar(50),
    place varchar(100),
    available_seats int,
    price_month float,    
    price_year float
);

create table stories (
    id_story serial primary key,
    author varchar(50),
    title varchar(255),
    story varchar(3000),
    blog_date date,
    image_name varchar(50)
);

create table comments (
    id_response serial primary key,
    id_story int,  
    id_user int,   
    content varchar(200),
    date_added date,
    foreign key (id_story) references stories(id_story)
        on delete restrict on update cascade,
    foreign key (id_user) references users(id_user)
        on delete restrict on update cascade
);

create table cart (
    id_cart serial primary key,
    id_user int NOT Null,
    id_course int NOT Null,
    foreign key (id_user) references users(id_user)
        on delete restrict on update cascade,
    foreign key (id_course) references courses(id_course)
        on delete restrict on update cascade
);
/* according to techer video, create a table for order then can get order and other */
CREATE table order_roll {
    id_order serial primary key,
    order_date timestamp DEFAULT CURRENT_TIMESTAMP,
    id_cart int NOT Null,
    id_user int NOT Null,
    id_course int NOT Null,
    foreign key (id_cart) references cart(id_cart)
        on delete restrict on update cascade,
    foreign key (id_user) references users(id_user)
        on delete restrict on update cascade,
    foreign key (id_course) references courses(id_course)
        on delete restrict on update cascade
}


insert into users (
	firstname,
	lastname,
	email,
	username,
	passwd,
	street_address,
	postal_code,
	city,
	phone_number
    )
	values (
		'John',
		'Doe',
		'johndoe@email.com',
		'johnny',
		'somehashpwd',
		'Street 1',
		'00100',
		'Bigcity',
		'+358 50 123456'
	);

insert into stories (
    author,
    title,
    story,
    blog_date,
    image_name
    )
	values (
        '@Maria',
        'A dream come true!',
        'I did it! I ran my first full marathon and it was an experience of a lifetime. Crossing that finish line after months of training was one of the most fulfilling moments of my life. Now that it is over, I wanted to share my journey with all of you. 
First of all, I have to admit that I was never an avid runner. In fact, running used to be my least favourite activity. However, a few years ago, I decided to challenge myself and signed up for my first 5k. From there, I began to enjoy the rush of endorphins and the feeling of accomplishment that came with finishing a race. So, I continued to run and set higher goals for myself. 
When I decided to run a full marathon, I knew it was going to be a massive challenge. I started by researching training programs online and reading books about long-distance running. I also spoke to other runners and got advice from experienced marathoners. Finally, I put together a training plan that worked for me. 
My training plan consisted of running five days a week, with gradually increasing mileage each week. I also incorporated strength training and cross-training at gym to prevent injuries and build overall fitness. I followed a strict diet plan that consisted of a balance of protein, carbs, and healthy fats to fuel my body for the long runs. 
During my training, I faced several obstacles, such as injuries, mental burnout, and self-doubt. However, I kept reminding myself of my end goal and pushed through the challenges. I also found that having a running buddy and joining a running group helped me stay motivated and accountable. 
Finally, race day arrived, and I felt a mix of excitement and nerves. But I also felt I was ready for this and that was just an incredible day! It was not about the marathon, it was about achieving a goal I had set to myself. I can warmly recommend this feeling to all of you!',
        '2023-04-05',
        'blog_marathon.jpg'
        );

insert into stories (
    author,
    title,
    story,
    blog_date,
    image_name
    )
	values (
        '@John',
        'Five Exercises for Stronger Triceps',
        'As a personal trainer with years of experience, I have worked with countless clients who want to strengthen and tone their triceps. These muscles, located on the back of your upper arm, play a crucial role in many everyday movements, from pushing a shopping cart to carrying a heavy load. Additionally, strong triceps are essential for anyone looking to improve their performance in sports or fitness activities. In this blog post, I will share five exercises that are sure to give you stronger triceps. 
1. The close-grip bench press is a classic exercise that targets the triceps while also engaging the chest and shoulders. To perform this exercise, lie on a flat bench and grip the barbell with your hands close together, about shoulder-width apart. Lower the barbell to your chest, then press it back up until your arms are straight. Aim for three sets of 8-12 reps. 
2. The triceps pushdown is a great exercise to isolate and target the triceps. To perform this exercise, stand in front of a cable machine with a rope attachment. Grip the rope with both hands and bring it down to your chest. Keep your elbows close to your body and press the rope down until your arms are straight. Aim for three sets of 12-15 reps. 
3. Dips are a bodyweight exercise that targets the triceps, chest, and shoulders. To perform this exercise, find parallel bars or use a dip machine. With your arms straight, lower your body until your elbows are bent to a 90-degree angle, then press back up until your arms are straight. Aim for three sets of 10-12 reps. 
4. Skull crushers are a popular exercise for targeting the triceps. To perform this exercise, lie on a flat bench and hold a barbell with your hands shoulder-width apart. Lower the barbell toward your forehead, keeping your elbows close to your head. Press the barbell back up until your arms are straight. Aim for three sets of 8-12 reps. 
5. The overhead triceps extension targets the long head of the triceps, which is located on the back of the arm. Stand with your feet shoulder-width apart and hold a dumbbell with both hands. Raise the dumbbell overhead, keeping your elbows close to your head and your palms facing upward. Slowly lower the dumbbell behind your head by bending your elbows. Keep your upper arms stationary throughout the movement. Once your forearms are parallel to the floor, pause for a second and then raise the dumbbell back to the starting position by extending your elbows. Repeat for the desired number of reps.',
        '2023-01-04',
        'blog_triceps.jpg'
    );

insert into stories (
    author,
    title,
    story,
    blog_date,
    image_name
    )
	values (
        '@Maria',
        'Importance of Strong Abdominal Muscles',
        'As a physiotherapist with extensive experience in treating low back problems, I cannot emphasize enough the importance of strong abdominal muscles. Strong abdominal muscles play a crucial role in maintaining a healthy spine and reducing the risk of low back pain. 
The muscles in your abdomen work together to support your spine and pelvis, providing stability and helping to distribute forces evenly throughout your body. When your abdominal muscles are weak, your spine is more susceptible to injury, which can lead to pain and discomfort. 
One of the most common causes of low back pain is a weak core. A weak core can cause your back muscles to compensate, leading to tension and strain in the lower back. Over time, this can cause chronic pain and even injury. 
In addition to reducing the risk of low back pain, strong abdominal muscles can also improve your overall posture and balance. Good posture is essential for maintaining a healthy spine, and a strong core can help you maintain proper alignment and reduce the risk of injury. 
So, how can you strengthen your abdominal muscles? There are many exercises you can do to strengthen your core, including planks, sit-ups, and crunches. However, it is important to ensure that you are doing these exercises correctly to avoid injury. 
As a physiotherapist, I recommend working with a professional to develop a safe and effective core-strengthening program. A physiotherapist can help you identify any muscle imbalances or weaknesses and develop an individualized program to target these areas. 
It is also important to note that core strengthening exercises alone may not be enough to prevent low back pain. Maintaining a healthy lifestyle, including regular exercise, a balanced diet, and good sleep habits, is essential for overall health and well-being. 
In conclusion, strong abdominal muscles are crucial for maintaining a healthy spine and reducing the risk of low back pain. If you are experiencing low back pain or want to prevent it from occurring, consider working with a physiotherapist to develop a safe and effective core-strengthening program. Remember, a healthy spine is essential for overall health and well-being.',
        '2022-07-22',
        'blog_abdominal.jpg'
        );

insert into stories (
    author,
    title,
    story,
    blog_date,
    image_name
    )
	values (
        '@Ellen',
        'Love your body, take time to yourself, and enjoy!',
        'Hello and welcome to this fitness blog! As a 35-year-old woman, I have spent a lot of time trying to find the perfect workout routine that will help me achieve my fitness goals while still feeling good about myself. One of the most important things that I have learned is the importance of body neutrality and self-love in the gym. 
Body neutrality is the idea that your body is just a vessel for your mind and your soul. It is about treating your body with respect and care, but not allowing it to define who you are as a person. This is especially important when it comes to fitness, where we can sometimes get caught up in the idea of achieving a certain look or weight. 
For me, body neutrality means focusing on the things that my body can do, rather than how it looks. When I am at the gym, I try to focus on my strength and my endurance, rather than how toned my arms look or how flat my stomach is. This shift in focus has not only helped me feel more confident in the gym, but it has also allowed me to enjoy my workouts more and see them as a way to take care of my body, rather than punish it. 
Self-love is also crucial when it comes to fitness. We often hear the phrase ""no pain, no gain"" in reference to working out, but I believe that this mindset is harmful and can lead to burnout or injury. Instead, I try to approach my workouts with a sense of love and compassion for my body. 
This means listening to my body when it tells me it needs a break, and not pushing myself too hard just because I think I should. It also means treating myself with kindness and understanding, even when I do not perform as well as I would like to in a particular workout. 
One of the things that I love about gym training is the sense of community that it can create. By focusing on body neutrality and self-love, I have been able to connect with other gym-goers who share my values. We encourage each other to listen to our bodies and approach our workouts with kindness and compassion. 
Ultimately, the most important thing that I have learned about gym training is that it should be a form of self-care, rather than punishment. When we approach our workouts with a sense of body neutrality and self-love, we can create a positive and empowering relationship with our bodies and with each others!',
        '2022-11-27',
        'blog_selflove.jpg'
    );

insert into stories (
    author,
    title,
    story,
    blog_date,
    image_name
    )
	values (
        '@Ellen',
        'Diet Makes Sense!',
        'Hello everyone, I am excited to share some helpful tips for those of you who are training to lose weight and feel better. As an educated nutritionist, I know how important it is to have a balanced diet when it comes to achieving your fitness goals. 
First and foremost, it is important to understand that weight loss is not just about what you eat, but also how much you eat. It is essential to be in a calorie deficit if you want to lose weight. This means that you need to consume fewer calories than your body burns in a day. One way to do this is by tracking your food intake and using a calorie calculator to determine how many calories you need to consume in a day. 
Another tip for losing weight is to focus on whole, nutrient-dense foods. This means foods that are rich in vitamins, minerals, and fibre, such as fruits, vegetables, whole grains, lean protein sources, and healthy fats. These foods are not only low in calories but also provide your body with the nutrients it needs to function at its best. 
In addition to consuming the right foods, it is important to stay hydrated. Water is crucial for regulating body temperature, transporting nutrients, and flushing out toxins. Aim to drink at least 8-10 cups of water per day and increase your intake during workouts.  
When it comes to timing your meals, aim to eat a balanced meal 2-3 hours before exercising to allow time for digestion. If you need a snack closer to your workout, choose something small and easily digestible, such as a banana or a handful of nuts. 
Finally, recovery is just as important as the workout itself. Make sure to give your body time to rest and recover between workouts. This means taking rest days and just enjoy doing something you really like!',
        '2023-03-12',
        'blog_diet.jpg'
    );

insert into stories (
    author,
    title,
    story,
    blog_date,
    image_name
    )
	values (
        '@Mike',
        'How to grow muscle?',
        'Hey there, fellow fitness enthusiasts! My name is Mike, and I am a 26-year-old guy who is passionate about staying fit and healthy. Today, I want to talk to you about systematic training, especially if your goal is to build muscle and get in better shape. 
As someone who has been hitting the gym for a while now, I can tell you that the key to achieving your fitness goals is consistency. You can not just show up at the gym once a week and expect to see results. Instead, you need to develop a systematic approach to your training, which includes regular workouts, proper nutrition, and enough rest and recovery time. 
One of the most effective ways to build muscle is through weightlifting. But to see real results, you need to challenge yourself with progressively heavier weights. This means you should aim to increase the weight you are lifting every few weeks, gradually pushing your muscles to adapt and grow stronger. 
When it comes to weightlifting, it is also essential to focus on proper form and technique. This means taking the time to learn how to perform each exercise correctly and avoiding any shortcuts or cheating. Proper form not only reduces the risk of injury but also helps you target the muscles you want to work on more effectively. 
Of course, weightlifting alone will not give you the results you want. Your diet is just as important as your workout routine when you want to achieve results. If you are serious about building muscle and getting into shape, you need to pay attention to what you eat. Your diet should consist of a healthy balance of proteins, carbohydrates, and healthy fats. And remember, proteins are especially important when it comes to building muscle!! 
Hope these advice will help you in your own path of training. Talk to you again soon!',
        '2022-11-27',
        'blog_growMuscles.jpg'
    );
/* 
update stories set story=' ' where id_story = 1;
 */
insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Yoga1.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Yoga.mp4',
        'Body Balance',
        'John Doe',
        'This body balance yoga course is designed to improve stability and coordination through a series of postures and movements. The classes focus on building strength in the core, legs, and feet, while also incorporating mindfulness techniques to enhance body awareness and control. Students of all levels can benefit from this course, which offers a supportive and energizing environment for developing greater balance and harmony within the body.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        60.00,
        500.00
        );

insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Body Step.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Body Step.mp4',
        'Body Step',
        'Emily Parker',
        'Body step exercise is a cardio-based workout that uses basic stepping movements to improve fitness and stamina. It involves a series of choreographed routines set to music, which makes the workout fun and engaging.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        70.00,
        500.00
        );

insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Body attack.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Body attack.mp4',
        'Body Attack',
        'Sophia Lee',
        'Body attack is a high-energy, sports-inspired group fitness class that combines aerobic and plyometric movements with strength and stabilization exercises. Designed to improve cardiovascular fitness, agility, and overall physical endurance, Body attack provides a challenging workout suitable for individuals of all fitness levels.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        70.00,
        500.00
        );


insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Aerobic.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Aerobic.mp4',
        'Aerobic',
        'Samuel Kim',
        'Aerobic exercise classes involve continuous and rhythmic movements that increase the heart rate and improve cardiovascular endurance. These classes can be high-impact or low-impact, and may include a variety of exercises such as dance, step aerobics, kickboxing, and cycling, making them a fun and effective way to burn calories and improve overall fitness.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        60.00,
        500.00
        );

insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Core.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Core.mp4',
        'Core',
        'Chloe Davis',
        'Core exercise classes focus on strengthening and toning the muscles in the abdomen, back, and pelvis. These classes often include exercises such as planks, crunches, and bridges, and can be tailored to challenge individuals of all fitness levels, helping to improve posture, stability, and overall core strength.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        70.00,
        500.00
        );

insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Body building.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Body building.mp4',
        'Body Building',
        'Olivia Ramirez',
        'Bodybuilding exercise classes are designed to help individuals build muscle and increase strength through weightlifting and resistance training. These classes often focus on specific muscle groups and may include exercises such as squats, deadlifts, and bench presses, making them an effective way to sculpt and tone the body while improving overall fitness.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        60.00,
        500.00
        );

insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Crossfit.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Crossfit.mp4',
        'Crossfit',
        'OBenjamin Ortiz',
        'CrossFit exercise classes combine high-intensity interval training, weightlifting, and gymnastics to create a challenging and diverse workout that targets all aspects of fitness. These classes often involve a combination of functional movements performed at a high intensity, making them a great way to improve strength, endurance, and overall fitness.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        70.00,
        500.00
        );

insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Barre.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Barre.mp4',
        'Barre',
        'Brandon Collins',
        'Barre exercise classes are inspired by ballet and incorporate elements of dance, Pilates, and yoga to create a low-impact, full-body workout. These classes focus on small, isometric movements that target the muscles in the legs, core, and arms, while also improving flexibility, balance, and posture, making them a great choice for individuals of all fitness levels.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        60.00,
        500.00
        );
/* 
    insert into cart(
        id_user,
        id_course
    ) values (
        1,
        3
    );

    insert into cart(
        id_user,
        id_course
    ) values (
        1,
        5
    );

insert into comments (
    id_story,
    id_user,
    content,
    date_added
    )
    values (
        1,
        1,
        'I really like this course, it is very fun and the trainer is very nice!',
        '2020-12-01'
        );
 */
create table story_reactions (
    id_reaction serial primary key,
    id_story int not null,
    id_user int not null,
    reaction_type varchar(255) not null,
    foreign key (id_story) references stories(id_story),
    foreign key (id_user) references users(id_user)
    );

insert into story_reactions (
    id_story,
    id_user,
    reaction_type
    )
    values (
        1,
        1,
        'like'
        );

update courses set course_description = 'This body balance yoga course is designed to improve stability and coordination through a series of postures and movements. The classes focus on building strength in the core, legs, and feet, while also incorporating mindfulness techniques to enhance body awareness and control. Students of all levels can benefit from this course.' where id_course = 1;

alter table courses add column trainer_image_name varchar(50);
UPDATE courses SET trainer_image_name = 'trainer-f1.png' WHERE id_course = 1;
UPDATE courses SET trainer_image_name = 'trainer-f2.png' WHERE id_course = 2;
UPDATE courses SET trainer_image_name = 'trainer-f3.png' WHERE id_course = 3;
UPDATE courses SET trainer_image_name = 'trainer-f4.png' WHERE id_course = 4;
UPDATE courses SET trainer_image_name = 'trainer-f1.png' WHERE id_course = 5;
UPDATE courses SET trainer_image_name = 'trainer-f2.png' WHERE id_course = 6;
UPDATE courses SET trainer_image_name = 'trainer-f3.png' WHERE id_course = 7;
UPDATE courses SET trainer_image_name = 'trainer-f4.png' WHERE id_course = 8;