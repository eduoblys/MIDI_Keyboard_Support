loadAPI(15);

// Remove this if you want to be able to use deprecated methods without causing script to stop.
// This is useful during development.
host.setShouldFailOnDeprecatedUse(true);

host.defineController("Roland", "A300 Pro", "0.2", "08b8ef3d-73f7-4667-8e79-21f1314a2fe5", "Ega420");
host.defineMidiPorts(2, 1);
const MOXF_BUTTON_PLAY   = 0x5E;
const MOXF_BUTTON_STOP   = 0x5D;
const MOXF_BUTTON_REC    = 0x5F;
const MOXF_BUTTON_FWD    = 0x5C;
const MOXF_BUTTON_BACK   = 0x5B;
const MOXF_BUTTON_LOCATE = 0x58;

var transport = null;


function init()
{
   var inputPort = host.getMidiInPort(0);
   inputPort.setMidiCallback(onMidi0);

   noteIn = inputPort.createNoteInput("Yamaha MOXF", "8?????", "9?????", "B?01??", "B?40??", "E?????");

   var noteMap = initArray (-1, 128);
   for (i = 0; i < 128; i++)
      noteMap[i] = 127 - i;
   noteIn.setKeyTranslationTable (noteMap);

   transport = host.createTransport ();

   println("MOXF initialized!");
}

function onMidi0(status, data1, data2)
{
   if (isNoteOn(status) && data2 == 127)
   {
      switch (data1)
      {
         case MOXF_BUTTON_PLAY:
            transport.play ();
            break;

         case MOXF_BUTTON_STOP:
            transport.stop ();
            break;

         case MOXF_BUTTON_REC:
            transport.record ();
            break;

         case MOXF_BUTTON_FWD:
            transport.fastForward ();
            break;

         case MOXF_BUTTON_BACK:
            transport.rewind ();
            break;

         case MOXF_BUTTON_LOCATE:
            transport.tapTempo ();
            break;

         default:
            host.errorln ("Command " + data1 + " is not supported.");
            break;
      }
   }

}

function flush()
{
   // println("Flush called.");
}

function exit()
{
   println("Exited!");
}