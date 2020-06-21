import { templates, select } from '../settings.js';

import  AmountWidget  from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';


class Booking{
  constructor(bookingElement) {
    const thisBooking = this;

    thisBooking.render(bookingElement);
    thisBooking.initWidgets();

  }

  render(bookingElement) {
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();

    thisBooking.dom = {};
    thisBooking.dom.wrapper = bookingElement;

    thisBooking.dom.wrapper.innerHTML = generatedHTML;

    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(select.booking.tables);
  }

  initWidgets() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);

    thisBooking.dom.hourPicker.addEventListener('updated', function(){
      thisBooking.updateDOM();
    });

    thisBooking.dom.datePicker.addEventListener('updated', function(){
      thisBooking.updateDOM();
    });

    thisBooking.dom.submit.addEventListener('click', function(){
      event.preventDefault();
      thisBooking.sendReservation();
    });

    thisBooking.checkTables();
  }

}

export default Booking;
