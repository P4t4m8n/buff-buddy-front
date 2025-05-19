export const genTempId = () => {
    const randomId = Math.floor(Math.random() * 1000000);
    const timestamp = Date.now();
    const tempId = `temp_${randomId}_${timestamp}`;
    return tempId;
}