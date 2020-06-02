import { Component, OnInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiModelService } from 'src/app/services/model/api-model.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {


  public model = 0;
  public record;
  public recording = false;
  public url;
  public file;
  public error;
  public target_url;
  public content_url;
  public styleId;
  private stream: MediaStream;
  public modelList;
  firstTransfer = false;



  constructor(public fb: FormBuilder, private domSanitizer: DomSanitizer, private apiModel: ApiModelService) {
    this.apiModel.healtCheck();
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
    let date = Date.now();
    this.file = new File([blob], 'Record_' + date, { type: "audio/wav", lastModified: date });
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }


  processAudio() {
    this.firstTransfer = true;
    if ((this.url) && (this.styleId)) {
      const formData = new FormData();
      formData.append('target_id', this.styleId);
      formData.append('model_id', '0');
      formData.append('content_file', this.file);

      this.apiModel.trasnferOnFire(formData).subscribe((response) => {
        this.setModelResponse(response['content_url'], response['target_url']);

        if (!this.modelList) this.modelList = [];

        this.modelList.push({
          name: this.getNameFromId(this.styleId),
          content_url: response['content_url'],
          target_url: response['target_url']
        })
        console.log(this.modelList)
      });

    } else {
      alert('Debes grabar una frase y seleccionar un estilo')
    }
  }


  setStyleId(id) {
    this.styleId = id;
  }

  setModelResponse(content_url, target_url) {
    this.target_url = target_url;
    this.content_url = content_url;
  }
  getNameFromId(id) {
    switch (id) {
      case 1:
        return "Jose Arango"
      case 2:
        return "Carlos Montoya"
      case 3:
        return "Leon Arango"
      default:
        return "Invalid Id"
    }
  }

  saveAsBlob() {
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = this.url;
    a.download = "audio";
    a.click();
    a.remove();
  }

  ngOnInit() {
  }

}
