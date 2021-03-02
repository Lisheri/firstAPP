import { makeAutoObservable } from 'mobx';

// ! 6.x的mobx使用方式发生变化, 不能使用@observable, @observalble, 使用以往的模式将不再响应

class RootStore {
    // * ES7的装饰器语法
    // @observable
    name = "悟空";

    // @observable
    testName = '测试';

    token = '';

    constructor() {
        makeAutoObservable(this)
    }

    changeName(name) {
        this.name = name;
    }

    changeTest(name) {
        this.testName = name;
    }

    setToken(token) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }
}

export default new RootStore();