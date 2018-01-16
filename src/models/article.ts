export class Article {
    
    principale: string;
    principaleB: string;

    constructor(
        public id: string = '',
        public user_id: string = '',
        public state_id: string = '',
        public address_id: string = '',
        public category_id: string = '',
        public style_id: string = '',
        public periods_id: string = '',
        public condition_id: string = '',
        public designer_id: string = '',
        public brand_id: string = '',
        public material_id: string = '',
        public color_id: string = '',
        public name: string = '',
        public description: string = '',
        public quantity: string = '',
        public price: string = '',
        public price_by: string = '',
        public size_height: string = '',
        public size_width: string = '',
        public size_depth: string = '',
        public weight: string = '',
        public number_of_packs: string = '',
        public pictures: any[] = []
    ) { }
}