interface IEnemy {
    id: number
    health: number
    damage: number
    displayStats(): void
}

class Ork implements IEnemy {
    id: number
    health: number
    damage: number
    constructor(id: number, health: number, damage: number) {
        this.id = id
        this.health = health
        this.damage = damage
    }

    displayStats() {
        console.log(`Ork (id: ${this.id} health: ${this.health} damage: ${this.damage})`)
    }
}

class Goblin implements IEnemy {
    id: number
    health: number
    damage: number
    constructor(id: number, health: number, damage: number) {
        this.id = id
        this.health = health
        this.damage = damage
    }

    displayStats() {
        console.log(`Goblin (id: ${this.id} health: ${this.health} damage: ${this.damage})`)
    }
}

class Elf implements IEnemy {
    id: number
    health: number
    damage: number
    constructor(id: number, health: number, damage: number) {
        this.id = id
        this.health = health
        this.damage = damage
    }

    displayStats() {
        console.log(`Elf (id: ${this.id} health: ${this.health} damage: ${this.damage})`)
    }
}

class EnemySpawner {
    static id = 0
    static list = [Ork, Goblin, Elf]

    private chooseRandomEnemy() {
        return EnemySpawner.list[Math.floor(Math.random() * EnemySpawner.list.length)]
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * max) + min
    }

    spawnRandomEnemy() {
        const Enemy = this.chooseRandomEnemy()

        const id = EnemySpawner.id
        const health = this.getRandomNumber(25, 100)
        const damage = this.getRandomNumber(1, 15)

        EnemySpawner.id += 1

        return new Enemy(id, health, damage)
    }

    start(delayMs: number) {
        setInterval(() => {
            const enemy = this.spawnRandomEnemy()
            enemy.displayStats()
        }, delayMs)
    }
}

const spawner = new EnemySpawner()
spawner.start(1000)