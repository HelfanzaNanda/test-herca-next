import dayjs from "dayjs";

export const getValueByKey = (obj : unknown, key : any) => {
    const keys = key.split('.');
    let result : any = null;
    keys.forEach((v, i) => {
        if (i == 0) {
            result = obj[v]; 
        }else{
            result = result[v];
        }
    });
    if(result == undefined) {
        result = null;
    }
    return result;
}

export const rupiahFormat = (num : number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(num)
};

export const dateReadable = (date : string) => {
    return dayjs(date).format("DD MMMM YYYY")
};