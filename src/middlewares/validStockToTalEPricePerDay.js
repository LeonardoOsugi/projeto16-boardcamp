
export function validStockToTalEPricePerDay(req, res, next){
    const {stockTotal, pricePerDay} = req.body;

    if(stockTotal === 0 || pricePerDay === 0){
        res.sendStatus(400);
        return;
    };
    next();
};