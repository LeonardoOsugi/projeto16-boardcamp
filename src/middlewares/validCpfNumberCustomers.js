
export function validCpfNumberCustomers(req, res, next){
    const {cpf} = req.body;

    for(let i = 0; i < cpf.length; i++){
        if(cpf[i] !== "0" || cpf[i] !== "1" || cpf[i] !== "2" || cpf[i] !== "3" || cpf[i] !== "4" || cpf[i] !== "5" || cpf[i] !== "6" || cpf[i] !== "7" || cpf[i] !== "8" || cpf[i] !== "9"){
            return res.sendStatus(400);
    }
    }

    next();
}