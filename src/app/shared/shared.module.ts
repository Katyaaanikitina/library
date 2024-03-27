import { NgModule } from "@angular/core";
import { FilterPipe } from "./pipes/filter.pipe";
import { FilterByTagsPipe } from "./pipes/filter-by-tags.pipe";
import { ChangeSecondWordToStarsPipe } from './pipes/change-second-word-to-stars.pipe';
import { BorderColorDirective } from './directives/border-color.directive';
import { InputColorDirective } from './directives/input-color.directive';
import { ImageSizeDirective } from './directives/image-size.directive';
import { ChangeBookIndexToNamePipe } from './pipes/change-book-index-to-name.pipe';

@NgModule({
    declarations: [
        FilterPipe,
        FilterByTagsPipe,
        ChangeSecondWordToStarsPipe,
        BorderColorDirective,
        InputColorDirective,
        ImageSizeDirective,
        ChangeBookIndexToNamePipe,
    ],
    exports: [
        FilterPipe,
        FilterByTagsPipe,
        ChangeSecondWordToStarsPipe,
        BorderColorDirective,
        InputColorDirective,
        ImageSizeDirective,
        ChangeBookIndexToNamePipe,
    ]
})
export class SharedModule {

}