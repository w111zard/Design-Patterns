"use strict";
class Ork {
    constructor(id, health, damage) {
        this.id = id;
        this.health = health;
        this.damage = damage;
    }
    displayStats() {
        console.log(`Ork (id: ${this.id} health: ${this.health} damage: ${this.damage})`);
    }
}
class Goblin {
    constructor(id, health, damage) {
        this.id = id;
        this.health = health;
        this.damage = damage;
    }
    displayStats() {
        console.log(`Goblin (id: ${this.id} health: ${this.health} damage: ${this.damage})`);
    }
}
class Elf {
    constructor(id, health, damage) {
        this.id = id;
        this.health = health;
        this.damage = damage;
    }
    displayStats() {
        console.log(`Elf (id: ${this.id} health: ${this.health} damage: ${this.damage})`);
    }
}
class EnemySpawner {
    choiseRandomEnemy() {
        return EnemySpawner.list[Math.floor(Math.random() * EnemySpawner.list.length)];
    }
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * max) + min;
    }
    spawnRandomEnemy() {
        const Enemy = this.choiseRandomEnemy();
        const id = EnemySpawner.id;
        const health = this.getRandomNumber(25, 100);
        const damage = this.getRandomNumber(1, 15);
        EnemySpawner.id += 1;
        return new Enemy(id, health, damage);
    }
    start(delayMs) {
        setInterval(() => {
            const enemy = this.spawnRandomEnemy();
            enemy.displayStats();
        }, delayMs);
    }
}
EnemySpawner.id = 0;
EnemySpawner.list = [Ork, Goblin, Elf];
const spawner = new EnemySpawner();
spawner.start(1000);
