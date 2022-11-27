export {}

const DEFAULT_PAGE_STATE = {
    data: {},
    pageNum: 0, 
    yPosition: 0,
}

type PageState = {
    temp: string,
    pageNum: number, 
    yPosition: number,
}

const PAGE_SIZE = 10;

type Config<DATA> = {
    elMoreBtn: HTMLElement;
    makeTemp: (data: DATA) => string;
    makeData: () => DATA
}

async function getTemp(getData:(any: any)=>any, init: boolean){
    if(init){
        return getInitTemp(getData, createTemp)
    }else{
        let pageState = getPageState();
        if(!pageState) return '';

        return getNextTemp(pageState, getData, createTemp); 
    }
}

async function onClickMoreBtn(getData, createTemp){
    let pageState = getPageState();
    if(!pageState) return;

    const temp = getNextTemp(pageState, getData, createTemp);
    return temp
}

async function getInitTemp(getData:(any: any) => any, createTemp){
    let pageState = getPageState();

    let temp ;
    if(!pageState) {
        pageState = DEFAULT_PAGE_STATE;
        temp = getNextTemp(pageState, getData, createTemp)
    }else{
        temp = pageState.temp
    }

    return temp
}

async function getNextTemp(pageState:PageState, getData:(any: any) => any, createTemp){
    const {pageNum: prevPageNum, temp: oldTemp} = pageState;

    const nextPageNum = prevPageNum + 1;

    const nextData = await getData({pageNum: nextPageNum});
    const nextTemp = createTemp(nextData);


    updatePageState({pageNum: pageState.pageNum + 1, temp: (oldTemp + nextTemp) });

    return nextTemp;
}

// async function getNextData(getData: ({pageNum}: {pageNum: number}) => Promise<any>): Promise<string>{
//     let oldPageState = getPageState();
//     if(!oldPageState) {
//         oldPageState = DEFAULT_PAGE_STATE;
//     }

//     const {pageNum: prevPageNum, temp: oldTemp} = oldPageState;

//     const nextPageNum = prevPageNum + 1;

//     const nextData = await getData({pageNum: nextPageNum});
//     const nextTemp = createTemp(nextData);

//     document.append(nextTemp);

//     updatePageState({pageNum: nextPageNum, temp: (oldTemp + nextTemp) });

//     return nextData;
// }


// async function getNextTemps(): Promise<string>{
//     let oldPageState = getPageState();

//     if(!oldPageState) {
//         oldPageState = DEFAULT_PAGE_STATE;
//     }

//     const {pageNum: prevPageNum, temp: oldTemp} = oldPageState;

//     const nextPageNum = prevPageNum + 1;

//     const nextData = await getData({pageNum: nextPageNum});
//     const nextTemp = createTemp(nextData);

//     document.append(nextTemp);

//     updatePageState({pageNum: nextPageNum, temp: (oldTemp + nextTemp) });

//     return nextTemp;
// }


function getPageState(): PageState | undefined {
    return window.history.state && window.history.state.page || undefined;
}

function updatePageState(pageState: Partial<PageState>){
    const curPageState = window.history.state && window.history.state.page || {};
    window.history.replaceState({page: Object.assign(curPageState, pageState)}, '');
}


async function getData({pageNum}:{pageNum:number}){
    const _data = Array(PAGE_SIZE);
    const data = _data.map((e, i) => (i + 1) + (PAGE_SIZE * (pageNum - 1)));

    return data;
}

function createTemp(data) {
    let temp ='';
    data.forEach(element => {
        temp += `This is item number ${element}.`;
    });
    return temp;
}