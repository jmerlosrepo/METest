const acctData = [ 
    { 
        "acctNum": "AAA - 1234", 
        "user": "Alice" 
    }, 
    { 
        "acctNum": "AAA - 5231", 
        "user": "Bob" 
    }, 
    { 
        "acctNum": "AAA - 9921", 
        "user": "Alice" 
    }, 
    { 
        "acctNum": "AAA - 8191", 
        "user": "Alice" 
    } 
]; 

const balance = { 
    "AAA - 1234": 4593.22, 
    "AAA - 9921": 0, 
    "AAA - 5231": 232142.5, 
    "AAA - 8191": 4344 
};

const filterBy = {
    acctNum: "account",
    balance: "balance"
}

const order = {
    asc:"asc",
    desc:"desc"
}

const sortingFunction = (name = null, filterBy = 'account', order="asc") => {
    let result = [];
    let balances = [];

    const sortList = (arr, order) => {
        let ordered = [];

        if(order === 'asc'){
            if(filterBy === 'account') { 
                ordered = arr.sort((a, b) => {
                    if (a.account < b.account) {
                        return -1;
                    }
                    if (a.account < b.account) {
                        return 1;
                    }
                    return 0;
               });
            } else { 
                ordered = arr.sort((a, b) => a.balance - b.balance);
            }
        }else{
            if(filterBy === 'balance') { 
                ordered = arr.sort((a, b) => {
                    if (b.account < a.account) {
                        return -1;
                    }
                    if (b.account < a.account) {
                        return 1;
                    }
                    return 0;
               });
            } else { 
                ordered = arr.sort((a, b) => b.balance - a.balance);
            }
        }

        return ordered;
    };
    
    Object.keys(balance).map( m => { 
        let a = {
            account: '',
            balance: 0
        };
        a.account = m; 
        a.balance= balance[m];
        balances.push(a);
    });

    if(!name){
        result = sortList(balances, order).map( res => res.account );
    } else {
        const accDataFIltered = acctData.filter( acc => acc.user.toLowerCase() === name.toLowerCase() );
        if (accDataFIltered.length === 0) return "User not found"; 
        accDataFIltered.map( accFiltered => {
            result.push(balances.find(balance => balance.account === accFiltered.acctNum));
        } )

        result = sortList(result, order).map( res => res.account );
    }

    return result;
} 


console.log('BOB ', sortingFunction('bob'));
console.log('CHARLIE ', sortingFunction('Charlie'));
console.log('ONLY SORTED BY ACCT ', sortingFunction());
console.log('ALLICE ', sortingFunction('Alice', filterBy.balance, order.asc));