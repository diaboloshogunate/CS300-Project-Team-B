class EnergyStation extends Cell {
    #hasMiniMart
    #hasRepairDepot
    backgroundColor = `#00a214`

    get name () {
        return `Energy Station`
    }

    buySupplies(amount, wallet, ship) {
        if(!this.#hasMiniMart) {
            throw `does not contain a mini mart`
        }
        // 1 credit per percentage of capacity
    }

    buyEnergy (wallet, ship) {
        if(!this.#hasRepairDepot) {
            throw `does not contain a repair depot`
        }
        // cost 100 to fill
    }

    buyUpgrade(wallet, ship) {
        if(!this.#hasRepairDepot) {
            throw `does not contain a repair depot`
        }
        // deniro 5 energy/cp for 200 credits
        // mucho deniro 1 energy/cp for 500 credits
        // energy pods for 100
        // enhanced sensor for 100
        // fuzzy dice for 50
    }
}