/*
    Существует несколько реализаций этого паттерана.
    В v2 показан способ активной доставки
    В v3 показан способ запроса
*/

namespace v2 {
    // Издатель (Publisher) или Субъект (Subject)
    interface Subject {
        addObserver(observer: Observer): void
        removeObserver(observer: Observer): void
        notifyObservers(): void
    }

    // Подписчик (Subscriber) или Наблюдатель (Observer)
    interface Observer {
        update(data: Object): void 
    }

    // Класс издателя
    class WeatherData implements Subject {
        private observers: Observer[]

        private tempeture: number
        private humidity:  number
        private pressure:  number

        constructor() {
            this.observers = []
        }

        addObserver(observer: Observer): void {
            this.observers.push(observer)
        }

        removeObserver(observer: Observer): void {
            const index = this.observers.indexOf(observer)
            if (index !== -1) {
                this.observers.splice(index, 1)
            }
        }

        notifyObservers(): void {
            this.observers.forEach(elem => {
                elem.update({
                    tempeture: this.tempeture,
                    humidity:  this.humidity,
                    pressure:  this.pressure
                })
            })
        }

        getDataFromIndicatros() {
            this.tempeture = Math.floor(Math.random() * 50)
            this.humidity = Math.floor(Math.random() * 50)
            this.pressure = Math.floor(Math.random() * 50)
        }
    }

    // Классы подписчиков
    class SomeDisplay implements Observer {
        private data: Object       
        
        update(data: Object): void {
            this.data = data
            this.display() // лучше так не делать, это просто пример
        }

        display(): void {
            console.log('I am a SomeDisplay and I have just got a new data')
            console.log('Data: ', this.data);
        }
    }

    class SomeOtherClass implements Observer {
        private data: Object
        
        // Этот метод просто показывает, что подписчики могут быть
        // разными классами, но все они должны реализовывать интерфейс Observer
        doThing(): void {
            
        }

        update(data: Object): void {
            this.data = data
            this.display() // лучше так не делать, это просто пример
        }

        display(): void {
            console.log('I am a SomeOtherClass and I have just got a new data')
            console.log('Data: ', this.data);
        }
    }

    // Издатель
    const weatherData = new WeatherData()

    // Подписчики
    const obj = new SomeDisplay()
    const otherObj = new SomeOtherClass()

    weatherData.addObserver(obj)
    weatherData.addObserver(otherObj)

    // Получили новые данные с индикаторов. Уведомляем подписчиков
    weatherData.getDataFromIndicatros()
    weatherData.notifyObservers()

    // obj захотел отписаться от рассылки
    weatherData.removeObserver(obj)

    // теперь obj не получит уведомление
    weatherData.getDataFromIndicatros()
    weatherData.notifyObservers()
}

namespace v3 {
        /**
     * Интерфейс издателя объявляет набор методов для управлениями подписчиками.
     */
    interface Subject {
        // Присоединяет наблюдателя к издателю.
        attach(observer: Observer): void;

        // Отсоединяет наблюдателя от издателя.
        detach(observer: Observer): void;

        // Уведомляет всех наблюдателей о событии.
        notify(): void;
    }

    /**
     * Издатель владеет некоторым важным состоянием и оповещает наблюдателей о его
     * изменениях.
     */
    class ConcreteSubject implements Subject {
        /**
         * @type {number} Для удобства в этой переменной хранится состояние
         * Издателя, необходимое всем подписчикам.
         */
        public state: number;

        /**
         * @type {Observer[]} Список подписчиков. В реальной жизни список
         * подписчиков может храниться в более подробном виде (классифицируется по
         * типу события и т.д.)
         */
        private observers: Observer[] = [];

        /**
         * Методы управления подпиской.
         */
        public attach(observer: Observer): void {
            const isExist = this.observers.includes(observer);
            if (isExist) {
                return console.log('Subject: Observer has been attached already.');
            }

            console.log('Subject: Attached an observer.');
            this.observers.push(observer);
        }

        public detach(observer: Observer): void {
            const observerIndex = this.observers.indexOf(observer);
            if (observerIndex === -1) {
                return console.log('Subject: Nonexistent observer.');
            }

            this.observers.splice(observerIndex, 1);
            console.log('Subject: Detached an observer.');
        }

        /**
         * Запуск обновления в каждом подписчике.
         */
        public notify(): void {
            console.log('Subject: Notifying observers...');
            for (const observer of this.observers) {
                observer.update(this);
            }
        }

        /**
         * Обычно логика подписки – только часть того, что делает Издатель. Издатели
         * часто содержат некоторую важную бизнес-логику, которая запускает метод
         * уведомления всякий раз, когда должно произойти что-то важное (или после
         * этого).
         */
        public someBusinessLogic(): void {
            console.log('\nSubject: I\'m doing something important.');
            this.state = Math.floor(Math.random() * (10 + 1));

            console.log(`Subject: My state has just changed to: ${this.state}`);
            this.notify();
        }
    }

    /**
     * Интерфейс Наблюдателя объявляет метод уведомления, который издатели
     * используют для оповещения своих подписчиков.
     */
    interface Observer {
        // Получить обновление от субъекта.
        update(subject: Subject): void;
    }

    /**
     * Конкретные Наблюдатели реагируют на обновления, выпущенные Издателем, к
     * которому они прикреплены.
     */
    class ConcreteObserverA implements Observer {
        public update(subject: Subject): void {
            if (subject instanceof ConcreteSubject && subject.state < 3) {
                console.log('ConcreteObserverA: Reacted to the event.');
            }
        }
    }

    class ConcreteObserverB implements Observer {
        public update(subject: Subject): void {
            if (subject instanceof ConcreteSubject && (subject.state === 0 || subject.state >= 2)) {
                console.log('ConcreteObserverB: Reacted to the event.');
            }
        }
    }

    /**
     * Клиентский код.
     */

    const subject = new ConcreteSubject();

    const observer1 = new ConcreteObserverA();
    subject.attach(observer1);

    const observer2 = new ConcreteObserverB();
    subject.attach(observer2);

    subject.someBusinessLogic();
    subject.someBusinessLogic();

    subject.detach(observer2);

    subject.someBusinessLogic();
}