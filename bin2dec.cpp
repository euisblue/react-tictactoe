#include <iostream>
using namespace std;

#include "bin2dec.hpp"

int main()
{
  Converter converter(2);
  converter.read();
  converter.convert();
  converter.print();

  return 0;
}
