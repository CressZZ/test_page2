
const DEFAULT_PAGE_STATE = {
    temp: '',
    pageNum: 1, 
    yPosition: 0,
    size: 10
}
const PAGE_SIZE = 10;

async function onEnterPage () {
    if(!hasPageState()){
        // getData를 해야 함
        const data = await getData({pageNum: 1, PAGE_SIZE});
        const temp = createTemp(data);

        setPageState({temp, pageNum: 1, yPosition: 0, size: PAGE_SIZE });
    }

    const {temp} = getPageState();
    document.append(temp);
}

function onClickMoreBtn(){
    const curentPageStae = getPageState();
    const nextPageState = 
}


async function getData({page, size}){
    const _data = Array(size);
    const data = _data.map((e, i) => (i + 1) + (size * (page - 1)));

    return data;
}

function createTemp(data) {
    let temp ='';
    data.forEach(element => {
        temp += `This is item number ${element}.`;
    });
}

function hasPageState() {
    return !!window.history.state && !!window.history.state.page;
}

function getPageState(){
    return hasPageState() && window.history.state.page || undefined;
}

function setPageState({temp, curPage, yPosition, size}){
    const curPageState = window.history.state && window.history.state.page || {};
    window.history.replaceState({page: Object.assign(curPageState, arguments[0])});
}

function updatePageState({temp, curPage, yPosition, size}){
    const curPageState = window.history.state && window.history.state.page || {};
    return {temp: temp += curPageState.temp, curPage: curPage += 1, }
}