function shuffle(array)
{
    for (let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function get_uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function formatSeconds(seconds) {
    const timer =`${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60)
        .toString().padStart(2, '0')}`;

    return timer;
}
export { shuffle, get_uuid, formatSeconds }
