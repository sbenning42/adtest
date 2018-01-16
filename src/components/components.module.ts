import { NgModule } from '@angular/core';
import { PicturesLoopComponent } from './pictures-loop/pictures-loop';
import { SlidesNavigatorComponent } from './slides-navigator/slides-navigator';

export { PicturesLoopComponent } from './pictures-loop/pictures-loop';
export { SlidesNavigatorComponent } from './slides-navigator/slides-navigator';

@NgModule({
	declarations: [PicturesLoopComponent, SlidesNavigatorComponent],
	imports: [],
	exports: [PicturesLoopComponent, SlidesNavigatorComponent]
})
export class ComponentsModule {}
