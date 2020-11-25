#pragma once
#include <iostream>

using std::cin;
using std::cout;
using std::endl;
using std::string;

class Converter 
{
  private:
    int base;
    string input;
    unsigned int output;

  public:
    Converter(int _base) : base(_base) { input=""; output=0; }

    void read();
    void convert();
    void print();
};

void Converter::read()
{
  bool inputError;
  do {
    cout << "> ";
    cin >> input;
    inputError = false;

    if (input.size() > 8) 
    {
      cout << "1 byte = 8 bits (8 digits)\n";
      inputError = true;
    }
    else
    {
      for(char c : input)
      {
        if (c != '0' && c != '1' )
        {
          inputError = true;
          break;
        }
      }
    }
  } while (inputError);
}

void Converter::convert()
{
  string temp = input;
  for(int i=0; i<temp.size(); ++i) 
  {
    output = output * 2 + (temp[i] - '0');
  }
}

void Converter::print() 
{
  cout << output << endl;
}
