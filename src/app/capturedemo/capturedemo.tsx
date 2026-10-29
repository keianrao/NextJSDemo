'use client'

import { useState, useRef } from 'react';
import widgetCSS from "./capturedemo.module.css";

async function startStreamingElemIntoVideo(
	elem: HTMLElement | null, 
	video: HTMLVideoElement | null
) {
	const RestrictionTarget = (window as any).RestrictionTarget; 

	if (!elem) return;
	if (!video) return;
	if (!navigator.mediaDevices) return;
	if (!navigator.mediaDevices.getDisplayMedia) return;
	if (!RestrictionTarget) return;
	if (!RestrictionTarget.fromElement) return;

	const mediaStream = await navigator.mediaDevices.getDisplayMedia({
		video: { displaySurface: "browser" },
		preferCurrentTab: true
	} as any);
	
	const restrictionTarget = await RestrictionTarget.fromElement(elem);
	const firstVideoTrack = mediaStream.getVideoTracks()[0];
	await (firstVideoTrack as any).restrictTo(restrictionTarget);

	video.srcObject = mediaStream;

	return mediaStream;
}

export default function Widget() {
	const inputRef = useRef<HTMLDivElement>(null);
	const videoRef  = useRef<HTMLVideoElement>(null);
	const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

	const { widgetStatus, changeWidgetStatus } = function () {
		const table = {
			"initial": "Click on Record to begin capturing the screen.",
			"rejected": "User chose to reject screen capture.",
			"started": "Now recording the contents of the blue region.",
		};
		const [value, set] = useState(table["initial"]);
		const select = (key: keyof typeof table) => set(table[key]);
		return { widgetStatus: value, changeWidgetStatus: select };
	}();

	const recording = mediaStream?.active;

	const recordButton = function () {
		if (recording) return;

		async function onClick() {
			try {
				const elem = inputRef.current;
				const video = videoRef.current;
				const mediaStream = await startStreamingElemIntoVideo(elem, video);
				if (!mediaStream) return;
				changeWidgetStatus("started");
				setMediaStream(mediaStream);
			}
			catch (error: any) {
				if (error.name == "NotAllowedError") {
					changeWidgetStatus("rejected");
					return;
				}
				throw error;
			}
		}

	    return <button onClick={onClick}>Record</button>;
	}();

	const stopButton = function () {
		if (!recording) return;

		function onClick() {
			const video = videoRef.current;
			if (!video) return;
			const srcObject = video.srcObject;
			if (!srcObject) return;
			if (!(srcObject instanceof MediaStream)) return;
			const tracks = srcObject.getTracks();
			for (const track of tracks) track.stop();
			video.srcObject = null;
			changeWidgetStatus("initial");
		}

		return <button onClick={onClick}>Stop</button>;
	}();

	return (
		<div className={widgetCSS["container"]}>
	        <div className={widgetCSS["output"]}>
	        	<video ref={videoRef} autoPlay />
	        </div>
			<div className={widgetCSS["input"]} ref={inputRef}>
				Example text you can select.
	        </div>
	        <div className={widgetCSS["controls"]}>
	        	{recordButton}
	        	{stopButton}
	        </div>
	        <div className={widgetCSS["statusbar"]}>
	        	{widgetStatus}
	        </div>
		</div>
	);
}
