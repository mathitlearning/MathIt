function LessonCard({
    lesson
}){


    return(

        <div className="lesson-card">


            <div className="lesson-card-icon">
                📘
            </div>


            <div className="lesson-card-body">


                <p>
                    {lesson.title}
                </p>


                <span>
                    {lesson.category} · {lesson.duration_min ?? 5} min
                </span>


            </div>


        </div>

    )

}


export default LessonCard