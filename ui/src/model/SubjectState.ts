export interface Subject {
    id: number;
    name: string;
    timeToStudy: number;
    knowledgeTestTypeId: number;
}

export interface GroupHasSubject {
    groupId: number;
    teacherId: number;
    subjectId: number;
}
