import axios from 'axios';

function urlCreator(method, payLoad) {
    return (idInstance, apiTokenInstance) => `https://api.green-api.com/waInstance${idInstance}/${method}/${apiTokenInstance}/${payLoad ?? ''}`;
}


export function checkAuthStatus(idInstance, apiTokenInstance) {
    const url = urlCreator('getStatusInstance');

    return axios.get(url(idInstance, apiTokenInstance));
}


export function sendMessage(idInstance, apiTokenInstance, chatId, message) {
    if (!message.length) return;

    const url = urlCreator('SendMessage');

    return axios.post(url(idInstance, apiTokenInstance), { chatId: `${chatId}@c.us`, message });
}

export async function getUpdates(idInstance, apiTokenInstance) {
    const url = urlCreator('ReceiveNotification');
    let data = null;

    await axios.get(url(idInstance, apiTokenInstance))
        .then(async res => {
            // console.log('response:', JSON.stringify(res.data));
            const receiptId = res?.data?.receiptId;

            if (res.data === null || res.data === undefined) return;

            const secondUrl = urlCreator('DeleteNotification', receiptId);

            await axios.delete(secondUrl(idInstance, apiTokenInstance))
                .then(resdelete => {
                    // console.log('responseDel:', resdelete.data);
                    data = res?.data;
                })
                .catch(error => { alert(`Ошибка при получении обновлений, обновите страницу\r\n\r\n ${error.message}`); });

        })
        .catch(error => { alert(`Ошибка при получении обновлений, обновите страницу\r\n\r\n ${error.message}`); });
    return data;
}