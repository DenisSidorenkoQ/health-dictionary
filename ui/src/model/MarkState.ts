export interface Mark {
    id: number;
    lessonId: number;
    studentId: number;
    number: number;
}

export interface SubjectAvgMark {
    subjectId: number;
    subjectName: string;
    timeToStudy: number;
    knowledgeTestType: string;
    avgMark: number;
}
