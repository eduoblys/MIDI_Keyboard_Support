loadAPI(15);

// Remove this if you want to be able to use deprecated methods without causing script to stop.
// This is useful during development.
host.setShouldFailOnDeprecatedUse(true);

host.defineController("Roland", "A300 Pro", "0.1", "08b8ef3d-73f7-4667-8e79-21f1314a2fe5", "Ega420");

host.defineMidiPorts(2, 1);

if (host.platformIsWindows())
{
   // TODO: Set the correct names of the ports for auto detection on Windows platform here
   // and uncomment this when port names are correct.
   // host.addDeviceNameBasedDiscoveryPair(["Input Port 0", "Input Port 1"], ["Output Port 0", "Output Port -1"]);
}
else if (host.platformIsMac())
{
   // TODO: Set the correct names of the ports for auto detection on Mac OSX platform here
   // and uncomment this when port names are correct.
   // host.addDeviceNameBasedDiscoveryPair(["Input Port 0", "Input Port 1"], ["Output Port 0", "Output Port -1"]);
}
else if (host.platformIsLinux())
{
   // TODO: Set the correct names of the ports for auto detection on Linux platform here
   // and uncomment this when port names are correct.
   // host.addDeviceNameBasedDiscoveryPair(["Input Port 0", "Input Port 1"], ["Output Port 0", "Output Port -1"]);
}

function init() {
   transport = host.createTransport();
   host.getMidiInPort(0).setMidiCallback(onMidi0);
   host.getMidiInPort(0).setSysexCallback(onSysex0);
   host.getMidiInPort(1).setMidiCallback(onMidi1);
   host.getMidiInPort(1).setSysexCallback(onSysex1);

   // TODO: Perform further initialization here.
   println("A300 Pro initialized!!!!!");
}

// Called when a short MIDI message is received on MIDI input port 0.
function onMidi0(status, data1, data2) {
   // TODO: Implement your MIDI input handling code here.
   printMidi(status, data1, data2);
}

// Called when a MIDI sysex message is received on MIDI input port 0.
function onSysex0(data) {
   // MMC Transport Controls:
   switch (data) {
      case "f07f7f0605f7":
         transport.rewind();
         break;
      case "f07f7f0604f7":
         transport.fastForward();
         break;
      case "f07f7f0601f7":
         transport.stop();
         break;
      case "f07f7f0602f7":
         transport.play();
         break;
      case "f07f7f0606f7":
         transport.record();
         break;
   }
}
// Called when a short MIDI message is received on MIDI input port 1.
function onMidi1(status, data1, data2) {
   // TODO: Implement your MIDI input handling code here.
   printMidi(status, data1, data2);

}

// Called when a MIDI sysex message is received on MIDI input port 1.
function onSysex1(data) {
}

function flush() {
   // TODO: Flush any output to your controller here.
}

function exit() {

}