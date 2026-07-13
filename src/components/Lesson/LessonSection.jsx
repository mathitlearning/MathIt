import LessonCard from "./LessonCard"


function LessonSection({
    title,
    lessons
}){


    return(

        <section className="lesson-section">


            <h2>
                {title}
            </h2>


            <div className="lesson-row">

                {
                    lessons.map(lesson=>(

                        <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                        />

                    ))
                }

            </div>


        </section>

    )

}


export default LessonSection