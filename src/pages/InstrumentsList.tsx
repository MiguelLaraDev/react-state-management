import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InstrumentsList = () => {
  return (
    <div className='w-full flex flex-col gap-4'>
      {Array.from({ length: 100 }, (_, i) => (
        <div
          key={i}
          className='w-full h-48 flex flex-row gap-0 p-0 bg-neutral-100 rounded-xl overflow-hidden'
        >
          <div className='w-1/4 bg-neutral-150'>image</div>

          <div className='flex flex-col gap-1 flex-grow px-8 py-4'>
            <h2 className='font-semibold text-2xl'>Instrument name</h2>
            <div>Instrument rating</div>

            <ul>
              <li className='text-neutral-600'>Instrument description</li>
              <li className='text-neutral-600'>Instrument description</li>
            </ul>
            <p>Instrument Availability</p>
          </div>

          <div className='w-1/4 flex flex-col items-end justify-between p-8'>
            <p className='font-semibold text-3xl tracking-tighter'>300 €</p>

            <button>
              <FontAwesomeIcon icon={faCartPlus} className='text-2xl text-neutral-700' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstrumentsList;
