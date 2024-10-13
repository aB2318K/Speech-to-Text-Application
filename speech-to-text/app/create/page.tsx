export default function Create() {
    return(
         <div>
            This is where you will be able to speak to the microphone and convert your speech into text.
            
            <textarea id="speech" name="speech" rows={4} cols={50} placeholder="Your transcription will be displayed here"></textarea>
         </div>
    )
}