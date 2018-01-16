export class PageOptions {

    loaded: number;
    miss: number;

    constructor(
        public count: number,
        public size: number = 20,
        public index: number = 0,
        public sort: string = 'all',
    ) {
        this.loaded = 0;
        this.miss = count;
    }

    getOptions() {
        return {
            pageSize: this.size,
            pageIndex: this.index,
            sort: this.sort
        };
    }

    nextPage() {
        if (this.loaded >= this.count || this.miss <= 0) { return ; }
        this.index += 1;
        this.loaded += this.size;
        this.miss -= this.size;
        if (this.miss < 0) { this.miss = 0; }
        if (this.loaded > this.count) { this.loaded = this.count; }
    }

    changeSize(size) {
        this.size = size;
        this.index = 0;
        this.loaded = 0;
        this.miss = this.count;
    }

    reNew(count, size = 20, index = 0, sort = 'all') {
        this.size = size;
        this.index = index;
        this.sort = sort;
        this.count = count;
        this.loaded = 0;
        this.miss = count;
    }

}