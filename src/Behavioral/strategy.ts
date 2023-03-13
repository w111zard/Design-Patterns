/* 
    Стратегия (Strategy) — это поведенческий паттерн 
    проектирования, который определяет семейство схожих 
    алгоритмов и помещает каждый из них в собственный класс, 
    после чего алгоритмы можно взаимозаменять прямо во время 
    исполнения программы.
*/

/* 
    Предположим, что мы делаем игру про уток, мы объявили 
    абстрактный класс Duck
*/

namespace v1 {
    abstract class Duck {
        quack(): void {
            console.log('*Quack*')
        }

        swim(): void {
            console.log('I am swimming')
        }

        abstract display(): void 
    }

    class MallardDuck extends Duck {
        display(): void {
            console.log('I am a mallard duck')
        }
    }

    class RedheadDuck extends Duck {
        display(): void {
            console.log('I am a redhead duck');
        }
    }

    class RubberDuck extends Duck {
        display(): void {
            console.log('I am a rubber duck')
        }
    }
}

/*
    Теперь мы хотим добавить возможность уткам летать
*/

namespace v2 {
    abstract class Duck {
        quack(): void {
            console.log('*Quack*')
        }

        swim(): void {
            console.log('I am swimming')
        }

        abstract display(): void 

        // Добавили метод для полета в общем классе
        fly(): void {
            console.log('I am flying')
        }
    }

    /*  Теперь все утки могут летать. Но мы не учли, что
        летать должны не все утки. Например резиновая утка
        не должна.
    */

    class RubberDuck extends Duck {
        display(): void {
            console.log('I am rubber duck')
        }

        fly() {
            // Конечно, мы можем переопределить метод
        }
    }
}

/*
    Мы можем легко переопределить метод для резиновой утки,
    но что если мы хотим добавить в игру утки приманки,
    которые не могут летать и крякать. Уже сейчас мы
    понимаем что надо менять архитектуру, потому что
    в дальнейшем потребуется еще больше изменений, а
    переопределять методы для каждого подкласса очень муторно.
    Очевидно, что наследование не решает проблему, т.к не все
    подклассы должны иметь те же методы, что и родительский класс
*/

/* 
    Мы знаем что все утки, независимо резиновые они или
    настоящие, могут плавать. Оставим неизменяемые методы
    в классе Duck, а все изменяемые методы fly() и
    quack() вынесем в интерфейсы.
*/

namespace v3 {
    abstract class Duck {
        // Все утки могут плавать, это неизменно
        swim(): void {
            console.log('I am swimming')
        }

        abstract display(): void 
    }
 
    // Только те утки, которые должны летать будут реализовывать
    // этот интерфейс
    interface Flyable {
        fly(): void
    }

    // Аналогично, только утки, которые умеют крякать,
    // будут реализовывать этот интерфейс
    interface Quackable {
        quack(): void
    }
}

/*
    У этой архитектуры есть очевидные проблемы. Придется
    записывать реализацию кода для каждого подкласса. 
    Например, 1000 уток будут иметь одну и ту же реализацию
    метода fly(). Нам придется копировать ее для каждого
    подкласса. А представим, если нам нужно будет внести
    небольшое изменение в метод fly(), нам придется
    изменять код 1000 уток.

    Конечно, можно сделать реализацию для абстрактного класса,
    но что если у нас будет 10 разных способов полета, нам
    все равно придется копировать их.
*/

/*
    Тут на сцену выходит паттерн стратегия. Она говорит, что

    1) Нужно выделить алгоритмы, которые часто подвергаются
    изменениям

    2) Создать интерфейс стратегий, описывающий этот алгоритм.
    Он должен быть общим для всех алгоритмов

    3) Поместить реализацию алгоритмов в классы, релизующие
    интерфейс стратегии

    4) В классе контекста (в примеры игры это Duck) нужно
    создать поля для хранение ссылки на текущий объект-стретегию,
    также нужно создать метод для ее изменения

    5) Клиенты контекста должны подавать в него соответствующий 
    объект-стратегию, когда хотят, чтобы контекст вёл себя определённым образом
*/

namespace v4 {

    // Шаги 1-2
    interface FlightStategy {
        fly(): void
    }

    interface QuackingStategy {
        quack(): void
    }

    // Шаг 3
    class FlyWithWings implements FlightStategy {
        fly() {
            console.log('I am flying with wings');
        }
    }

    class FlyNoWay implements FlightStategy {
        fly() {
            // не летает вообще
        }
    }

    class Quack implements QuackingStategy {
        quack(): void {
            console.log('*Quack*');
        }
    }

    class Squack implements QuackingStategy {
        quack(): void {
            // резиновые утки пищат
            console.log('*Squack*');
        }
    }

    class MuteQuack implements QuackingStategy {
        quack(): void {
            // деревянные утки не пищат
            console.log('*Silence*');
        }
    }

    abstract class Duck {
        // Шаг 4
        flyBehavior: FlightStategy
        quackBehavior: QuackingStategy

        performFly(): void {
            this.flyBehavior.fly()
        }

        performQuack(): void {
            this.quackBehavior.quack
        }

        setFlyBehavior(flyBehavior: FlightStategy) {
            this.flyBehavior = flyBehavior
        }

        setQuckBehavior(quackBehavior: QuackingStategy) {
            this.quackBehavior = quackBehavior
        }

        abstract display(): void
    }

    // Шаг 5
    class RubberDuck extends Duck {
        constructor() {
            super()

            this.flyBehavior = new FlyNoWay()
            this.quackBehavior = new Squack()
        }

        display(): void {
            console.log('I am a rubber duck')
        }
    }

    const duck = new RubberDuck()
    duck.performQuack()
}