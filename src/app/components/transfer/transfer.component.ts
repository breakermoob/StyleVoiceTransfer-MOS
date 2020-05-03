import { Component, OnInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {


  private record;
  private recording = false;
  private url;
  private error;
  public modelResponse;
  private styleId;

  constructor(private domSanitizer: DomSanitizer) {
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
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this)); 
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

  processAudio(){
    if ((this.url) && (this.styleId)) {
      this.modelResponse = this.url
    } else {
      alert('Debes grabar una frase y seleccionar un estilo')
    }
  }

  setStyleId(id){
    this.styleId = id;
    console.log(id)
  }
  setModelResponse(modelResponse){
    this.modelResponse = modelResponse
    console.log(this.modelResponse)
  }

  ngOnInit() {
  }

}
