import { storageModule } from './storage';

let storage = new storageModule();
export class themeModule {
    constructor() {
        this.list = ['glass', 'star', 'rabbit'];
    }
    init() {
        console.log('theme.init()');
        var skin = storage.local.get('theme') || 'glass';
        this.apply(skin);
    }
    //兼容火狐，火狐不支持disabled
    apply(skin) {
        var src = '../src/theme/' + skin + '.css';
        $('#theme').attr('href', src);
        storage.local.set('theme', skin);
    }
    change(skin) {
        this.apply(skin);
    }
    next() {
        var skin = storage.local.get('theme') || 'red';
        var themeNext = this.list.findNext(skin);
        this.apply(themeNext);
    }
}