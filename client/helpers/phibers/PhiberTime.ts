export default class PhiberTime {
    static getDatetimeLocal(now = new Date()) {
        var utcString = now.toISOString().substring(0, 19);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        var localDatetime =
            year +
            "-" +
            (month < 10 ? "0" + month.toString() : month) +
            "-" +
            (day < 10 ? "0" + day.toString() : day) +
            "T" +
            (hour < 10 ? "0" + hour.toString() : hour) +
            ":" +
            (minute < 10 ? "0" + minute.toString() : minute);
        return localDatetime;
    }

    static getBetweens(distance: number = 1): { today: number; backday: number } {
        const da = new Date();
        // da.setHours(da.getHours() + 3);

        var today = da.getTime();
        da.setDate(da.getDate() - distance);
        var backday = da.getTime();

        return {
            today,
            backday,
        };
    }

    static getInputBetweens(
        distance: number = 1
    ): { today: string; backday: string } {
        let today = PhiberTime.getDatetimeLocal();
        let now = new Date(new Date());
        now.setDate(now.getDate() - distance);
        let min = PhiberTime.getDatetimeLocal(now);
        return {backday: min, today};
    }

    static getFullDate(time?: Date): string {
        var timer: Date;
        if (time) {
            timer = time;
        } else {
            timer = new Date();
        }
        var realMonth = timer.getMonth() + 1;
        var month = realMonth < 10 ? `0${realMonth}` : realMonth;
        var realDay = timer.getDate();
        var day = realDay < 10 ? `0${realDay}` : realDay;

        return `${timer.getFullYear()}-${month}-${day}`;
    }

    static getFullDateBetweens(distance: number = 1): { today: string, backday: string } {
        const today_date = new Date();
        const today = PhiberTime.getFullDate(today_date);

        today_date.setDate(today_date.getDate() - 1);
        const backday = PhiberTime.getFullDate(today_date);

        return {
            today,
            backday
        }
    }
}
