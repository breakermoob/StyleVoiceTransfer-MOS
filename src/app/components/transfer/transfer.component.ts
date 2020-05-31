import { Component, OnInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiModelService } from 'src/app/services/model/api-model.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {


  public record;
  public recording = false;
  public url;
  public error;
  public modelResponse;
  public styleId;
  private stream: MediaStream;
  form: FormGroup;



  constructor(public fb: FormBuilder, private domSanitizer: DomSanitizer, private apiModel: ApiModelService) {
    // this.apiModel.healtCheck();
  }

  sanitize(url: string) {
    let audio = this.domSanitizer.bypassSecurityTrustUrl(url);
    return audio
  }

  initiateRecording() {
    this.url = null;
    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1
    };
    this.stream = stream;
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.recording = false;
    console.log(this.record)
    this.record.stop(this.processRecording.bind(this)); 
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
  }


  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }
  saveAsBlob(){
    //abrir el blob
    // window.open(this.url);

    //Descargar el blob con una etiqueta invisible machete :v
    let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = this.url;
        a.download = "audio";
        a.click();
        // window.URL.revokeObjectURL(this.url);
        a.remove();
  }

  processAudio() {
    if ((this.url) && (this.styleId)) {
      this.setModelResponse(this.url);
      this.saveAsBlob();

      const formData = new FormData();
      formData.append('target_id', this.styleId);
      formData.append('model_id', "0");
      formData.append('content_file', this.url);

      // this.apiModel.trasnferOnFire(formData).subscribe((res) => {
      //   console.log(res)
      // });
    } else {
      alert('Debes grabar una frase y seleccionar un estilo')
    }
  }


  setStyleId(id) {
    this.styleId = id;
  }

  setModelResponse(modelResponse) {
    this.modelResponse = modelResponse;
  }
  // download() {
  //   this.record.save('file.wav');
  // }

  ngOnInit() {
  }

}
