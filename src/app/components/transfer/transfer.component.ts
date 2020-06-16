import { Component, OnInit } from "@angular/core";
import * as RecordRTC from "recordrtc";
import { DomSanitizer } from "@angular/platform-browser";
import { ApiModelService } from "src/app/services/model/api-model.service";
import { FormBuilder } from "@angular/forms";
declare var $: any;

@Component({
  selector: "app-transfer",
  templateUrl: "./transfer.component.html",
  styleUrls: ["./transfer.component.css"],
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
  name: String = "";
  listCount: number = 0;
  queue: number = 0;
  processing: boolean = false;
  modalMessage;
  checkbox = false;

  constructor(
    public fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private apiModel: ApiModelService
  ) {
    this.apiModel.healtCheck();
  }

  sanitize(url: string) {
    let audio = this.domSanitizer.bypassSecurityTrustUrl(url);
    return audio;
  }

  initiateRecording() {
    this.url = null;
    let mediaConstraints = {
      video: false,
      audio: true,
      timeSlice: 1000,
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream) {
    this.recording = true;
    this.error = null;
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1,
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
    stream.getAudioTracks().forEach((track) => track.stop());
  }

  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    let date = Date.now();
    this.file = new File([blob], "Record_" + date, {
      type: "audio/wav",
      lastModified: date,
    });
  }

  errorCallback(error) {
    console.log(error);
    this.error = "Debe conceder permisos de audio";
  }

  dataPermission() {
    if (this.checkbox) {
      if (this.url && this.styleId) {
        this.processAudio();
      } else {
        $("#modal").modal("show");
        this.modalMessage = "Debes grabar una frase y seleccionar un estilo.";
      }
    } else {
      $("#modal").modal("show");
      this.modalMessage = "Debes aceptar el tratamiento de los datos.";
    }
  }

  processAudio() {
    this.firstTransfer = true;
    this.listCount++;
    if (this.modelList) {
      this.queue = this.listCount - this.modelList.length;
    }
    if (this.queue > 0) {
      this.processing = true;
    } else {
      this.processing = false;
    }
    this.name = this.getNameFromId(this.styleId);
    const formData = new FormData();
    formData.append("target_id", this.styleId);
    formData.append("model_id", "0");
    formData.append("content_file", this.file);

    this.apiModel.trasnferOnFire(formData).subscribe((response) => {
      console.log(response);
      this.setModelResponse(
        response["content_url"],
        response["target_url"],
        this.getNameFromId(response["target_id"])
      );

      if (!this.modelList) this.modelList = [];

      this.modelList.push({
        name: this.getNameFromId(response["target_id"]),
        content_url: response["content_url"],
        target_url: response["target_url"],
      });
      if (this.modelList) {
        this.queue = this.listCount - this.modelList.length;
      }
      if (this.queue > 0) {
        this.processing = true;
      } else {
        this.processing = false;
      }
    });
  }

  setStyleId(id) {
    this.styleId = id;
  }

  setModelResponse(content_url, target_url, name) {
    this.target_url = target_url;
    this.content_url = content_url;
    this.name = name;
  }
  getNameFromId(id) {
    switch (id) {
      case 1:
        return "Jose Arango";
      case 2:
        return "Carlos Montoya";
      case 3:
        return "Leon Arango";
      default:
        return "Invalid Id";
    }
  }

  saveAsBlob() {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display: none");
    a.href = this.url;
    a.download = "audio";
    a.click();
    a.remove();
  }

  ngOnInit() {}
}
