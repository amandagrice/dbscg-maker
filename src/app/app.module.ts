import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { FormsModule } from '@angular/forms'
import { FileUploadModule } from 'primeng/fileupload'
import { InputSwitchModule } from 'primeng/inputswitch'
import { DropdownModule } from 'primeng/dropdown'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { ImageCropperModule } from 'ngx-image-cropper'
import { DialogModule } from 'primeng/dialog'
import { AccordionModule } from 'primeng/accordion'
import { ColorPickerModule } from 'primeng/colorpicker'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    FileUploadModule,
    InputSwitchModule,
    DropdownModule,
    InputTextareaModule,
    MatSlideToggleModule,
    ImageCropperModule,
    DialogModule,
    AccordionModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
