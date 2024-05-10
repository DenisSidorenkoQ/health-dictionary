export class Util{
    static getDateFromTimestamp (timestamp: number ) {
        return new Date(timestamp * 1000).toLocaleDateString('ru-RU',
            { year: '2-digit', month: '2-digit', day: '2-digit'});
    }

    static studyPassConverter ( pass: boolean ) {
        if (pass) {
            return "н";
        } else {
            return "";
        }
    }
}
