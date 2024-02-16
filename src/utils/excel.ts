const excelData = (title: any, header: any, items: any) => {
    let excels = [];
    let headerE: any = [];
    let columnExcels = [];
    for (let index = 0; index < header.length; index++) {
        columnExcels.push({ width: 20 });
    }
    //  columnExcels = [columnExcels]
    // title
    let titles = [
        {
            value: title,
            span: header.length,
            backgroundColor: '#ffcc99',
            fontWeight: 'bold',
            alignVertical: 'center',
            align: 'center',
            height: 50,
            fontSize: 30,
            fontFamily: 'Times New Roman'
        }
    ];
    excels.push(titles);
    // console.log(header, 'header');
    // Header
    header.map((item: any) => {
        headerE.push({
            value: item.title,
            backgroundColor: '#ccecff',
            fontWeight: 'bold',
            alignVertical: 'center',
            align: 'center',
            fontSize: 11,
            height: 45,
            fontFamily: 'Times New Roman',
            borderStyle: 'thin',
            wrap: true
        });
    });
    excels.push(headerE);

    // data
    items.map((item: any, index: any) => {
        let rowEx: any = [];
        for (const key in item) {
            header.map((itemSub: any) => {
                if (itemSub.title === key) {
                    const temp = {
                        value: item[key], borderStyle: 'thin', wrap: true, alignVertical: 'center', align: 'center'
                    };
                    rowEx.push(temp);
                }
            });
        }
        // console.log('data excel', rowEx);
        rowEx.length > 0 ? excels.push(rowEx) : rowEx = [];
    });
    // console.log(excels, 'excel');
    return { excels, columnExcels };
};

export { excelData };